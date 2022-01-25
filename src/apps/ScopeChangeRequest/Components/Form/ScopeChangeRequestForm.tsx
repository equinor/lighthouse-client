import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useHttpClient } from '@equinor/portal-client';
import { openSidesheet } from '@equinor/sidesheet';
import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { getScopeChangeById, postScopeChange } from '../../Api/';
import { uploadAttachment } from '../../Api/ScopeChange/attachment';
import { ProcoSysTypes } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { Document } from '../../Api/STID/Types/Document';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeSideSheet } from '../CustomSidesheet';
import { OriginLink } from '../SearchableDropdown/OriginLink';
import { PCSLink } from '../SearchableDropdown/PCSLink';
import { StidSelector } from '../SearchableDropdown/stidSelector';
import { StidDocument } from '../StidDocument';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeParams {
    draft: boolean;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm<ScopeChangeRequest>(scopeChangeRequestSchema, {
        category: 'Hidden carryover',
        origin: 'Query',
        phase: 'IC',
    });
    const [origin, setOrigin] = useState<TypedSelectOption | undefined>();
    const [stidDocuments, setStidDocuments] = useState<Document[]>([]);
    const [attachments, setAttachments] = useState<File[]>([]);
    const removeDocument = (docNo: string) =>
        setStidDocuments((prev) => prev.filter((x) => x.docNo !== docNo));

    const appendDocuments = (documents: Document[]) =>
        setStidDocuments((prev) => [...prev, ...documents]);

    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);

    const { scopeChange } = useHttpClient();

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeParams) => {
        const tags = filterElementsByType(relatedObjects, 'tag');
        const systems = filterElementsByType(relatedObjects, 'system');
        const commPkgs = filterElementsByType(relatedObjects, 'commpkg');
        // const areas = filterElementsByType(relatedObjects, 'area');
        // const disciplines = filterElementsByType(relatedObjects, 'discipline');

        const scID = await postScopeChange(
            {
                ...formData.data,
                TagNumbers: tags?.map((x) => x.value) || [],
                SystemIds: systems?.map((x) => x.value) || [],
                CommissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
                documentNumbers: stidDocuments.map((x) => x.docNo) || [],
            },
            draft,
            scopeChange
        );
        if (scID) {
            attachments.forEach(async (attachment) => {
                await uploadAttachment(scID, attachment, scopeChange);
            });

            redirect(scID);
        }
    };

    const { mutate, error } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
    });

    const redirect = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId, scopeChange));
        clearActiveFactory();
    };

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined || relatedObjects.length > 0);
    }, [formData, setHasUnsavedChanges, relatedObjects]);

    const SubmitButton = () => {
        return (
            <Button disabled={!isValidForm} onClick={() => mutate({ draft: false })}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!isValidForm}
                variant={'outlined'}
                onClick={() => mutate({ draft: true })}
            >
                Save as draft
            </Button>
        );
    };

    const isValidForm = useMemo(() => {
        return formData.isValidForm() && origin?.value && relatedObjects.length > 0;
    }, [formData, origin?.value, relatedObjects]);

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
                        Component: OriginLink,
                        order: 3,
                        title: 'Origin',
                        props: {
                            originId: origin,
                            setOriginId: setOrigin,
                            originType: formData.fields.origin?.value,
                        },
                    },
                    {
                        Component: PCSLink,
                        order: 6,
                        title: 'Tag / comm pkg / system',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
                <Inline>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Documents</div>
                    <StidSelector appendDocuments={appendDocuments} />
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

                {/* <Field
                    label="Attachments"
                    value={<Upload attachments={attachments} setAttachments={setAttachments} />}
                /> */}
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

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes) {
    return items.filter((x) => x.type === type);
}
