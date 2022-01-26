import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useHttpClient } from '@equinor/portal-client';
import { openSidesheet } from '@equinor/sidesheet';

import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { getScopeChangeById, postScopeChange } from '../../Api/';
import { uploadAttachment } from '../../Api/ScopeChange/attachment';
import { ProcoSysTypes } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { Document } from '../../Api/STID/Types/Document';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeSideSheet } from '../CustomSidesheet';

import { Field } from '../DetailView/Components/Field';
import { Upload } from '../Upload';
import { Origin, OriginType } from './Origin';
import { PCSLink } from '../SearchableDropdown/PCSLink';
import { StidDocument } from '../StidDocument';
import { StidSelector } from '../STID';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeParams {
    draft: boolean;
}

export interface Origin {
    type: OriginType;
    id?: string;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm<ScopeChangeRequest>(scopeChangeRequestSchema);

    const [origin, setOrigin] = useState<Origin | undefined>();
    const [stidDocuments, setStidDocuments] = useState<Document[]>([]);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const removeDocument = (docNo: string) =>
        setStidDocuments((prev) => prev.filter((x) => x.docNo !== docNo));

    const appendDocuments = (documents: Document[]) =>
        setStidDocuments((prev) => [...prev, ...documents]);

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const { scopeChange } = useHttpClient();

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeParams) => {
        if (!origin?.type) return;
        const tags = filterElementsByType(relatedObjects, 'tag');
        const systems = filterElementsByType(relatedObjects, 'system');
        const commPkgs = filterElementsByType(relatedObjects, 'commpkg');
        const areas = filterElementsByType(relatedObjects, 'area');
        const disciplines = filterElementsByType(relatedObjects, 'discipline');

        const scID = await postScopeChange(
            {
                ...formData.data,
                origin: {
                    type: origin?.type,
                    id: origin?.id,
                },
                tagNumbers: tags?.map((x) => x.value) || [],
                systemIds: systems?.map((x) => Number(x.value)) || [],
                commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
                documentNumbers: stidDocuments.map((x) => x.docNo) || [],
                areaCodes: areas.map((x) => x.value) || [],
                disciplineCodes: disciplines.map((x) => x.value) || [],
            },
            draft,
            scopeChange
        );
        if (scID) {
            attachments.forEach(async (attachment) => {
                await uploadAttachment(scID, attachment);
            });
            setIsRedirecting(true);

            redirect(scID);
        }
    };

    const { mutate, isLoading, error } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
    });

    const redirect = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId, scopeChange));
        clearActiveFactory();
    };

    useEffect(() => {
        setHasUnsavedChanges(
            formData.getChangedData() !== undefined ||
            relatedObjects.length > 0 ||
            stidDocuments.length > 0
        );
    }, [formData, setHasUnsavedChanges, relatedObjects, stidDocuments.length]);

    const SubmitButton = () => {
        return (
            <Button disabled={!isValidForm || isLoading} onClick={() => mutate({ draft: false })}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!isValidForm || isLoading}
                variant={'outlined'}
                onClick={() => mutate({ draft: true })}
            >
                {isLoading ? <CircularProgress value={0} size={16} /> : <div>Save as draft</div>}
            </Button>
        );
    };

    const isValidForm = useMemo(() => {
        return (
            formData.isValidForm() &&
            (origin?.type === 'None' || origin?.id) &&
            relatedObjects.length > 0
        );
    }, [formData, origin, relatedObjects]);

    if (isRedirecting) {
        return (
            <LoadingPage>
                <CircularProgress value={0} size={48} />
            </LoadingPage>
        );
    }

    return (
        <>
            <TitleHeader>
                <span style={{ fontSize: '28px' }}>Create scope change request</span>
                <Icon
                    onClick={() => closeScrim()}
                    name="close"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </TitleHeader>

            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[SubmitButton, SaveButton]}
                customFields={[
                    {
                        Component: Origin,
                        order: 3,
                        title: 'Origin',
                        props: {
                            setOrigin: setOrigin,
                        },
                    },

                    {
                        Component: PCSLink,
                        order: 6,
                        title: 'References',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
                <Inline>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Documents</div>
                    <StidSelector appendDocuments={appendDocuments} documents={stidDocuments} />
                </Inline>
                {stidDocuments &&
                    stidDocuments.map((x) => {
                        return (
                            <Chip key={x.docNo}>
                                <StidDocument document={x} />

                                <Button
                                    variant="ghost_icon"
                                    onClick={() => {
                                        removeDocument(x.docNo);
                                    }}
                                >
                                    <Icon
                                        color={tokens.colors.interactive.primary__resting.rgba}
                                        name="clear"
                                    />
                                </Button>
                            </Chip>
                        );
                    })}

                <Field
                    label="Attachments"
                    value={<Upload attachments={attachments} setAttachments={setAttachments} />}
                />
            </GeneratedForm>

            {error && <p> Something went wrong, please check your connection and try again</p>}
        </>
    );
};

const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Chip = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 5px;
`;

const LoadingPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 650px;
`;

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes) {
    return items.filter((x) => x.type === type);
}
