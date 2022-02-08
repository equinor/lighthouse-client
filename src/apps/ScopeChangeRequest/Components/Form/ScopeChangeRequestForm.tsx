import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useHttpClient } from '@equinor/portal-client';
import { openSidesheet } from '@equinor/sidesheet';

import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { getScopeChangeById, postScopeChange } from '../../Api/ScopeChange';
import { uploadAttachment } from '../../Api/ScopeChange/attachment';
import { ProcoSysTypes } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeSideSheet } from '../Sidesheet/ScopeChangeSidesheet';

import { Field } from '../DetailView/Components/Field';
import { Upload } from '../Upload';
import { RelatedObjectsSearch } from '../SearchableDropdown/PCSLink';
import { Origin } from './Origin';
import { StidTypes } from '../../Api/Search/STID/searchStid';

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
        phase: 'IC phase',
        category: 'Hidden carryover',
    });

    const [attachments, setAttachments] = useState<File[]>([]);
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const { scopeChange } = useHttpClient();

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeParams) => {
        const tags = filterElementsByType(relatedObjects, 'tag');
        const systems = filterElementsByType(relatedObjects, 'system');
        const commPkgs = filterElementsByType(relatedObjects, 'commpkg');
        const areas = filterElementsByType(relatedObjects, 'area');
        const disciplines = filterElementsByType(relatedObjects, 'discipline');
        const documents = filterElementsByType(relatedObjects, 'document');

        const scID = await postScopeChange(
            {
                ...formData.data,
                tagNumbers: tags?.map((x) => x.value) || [],
                systemIds: systems?.map((x) => Number(x.value)) || [],
                commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
                documentNumbers: documents.map((x) => x.value) || [],
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
        setHasUnsavedChanges(formData.getChangedData() !== undefined || relatedObjects.length > 0);
    }, [formData, setHasUnsavedChanges, relatedObjects]);

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

    useEffect(() => {
        formData.fields.originSourceId?.setValue(undefined);
    }, [formData.fields.originSource?.value]);

    const isValidForm = useMemo(() => {
        console.log(formData.fields.originSource?.value);
        console.log(formData.isValidForm());
        console.log(formData.getChangedData());
        return (
            formData.isValidForm() &&
            (formData.fields.originSource?.value === 'NotApplicable' ||
                formData.fields.originSourceId?.value) &&
            relatedObjects.length > 0
        );
    }, [formData, relatedObjects]);

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
                        title: '',
                        props: {
                            originId: formData.fields.originSourceId,
                            originSource: formData.fields.originSource,
                        },
                    },

                    {
                        Component: RelatedObjectsSearch,
                        order: 6,
                        title: 'References',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
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

const LoadingPage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 650px;
`;

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}
