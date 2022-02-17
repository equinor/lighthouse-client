import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useHttpClient } from '@equinor/portal-client';
import { openSidesheet } from '@equinor/sidesheet';

import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import {
    getScopeChangeById,
    postScopeChange,
    uploadAttachment,
} from '../../Api/ScopeChange/Request';
import { ProcoSysTypes } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { ScopeChangeSideSheet } from '../Sidesheet/ScopeChangeSidesheet';

import { Upload } from '../Attachments/Upload';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { Origin } from './Origin';
import { StidTypes } from '../../Api/Search/STID/searchStid';
import { ScopeChangeErrorBanner } from '../Sidesheet/ErrorBanner';
import { ServerError } from '../../Api/ScopeChange/Types/ServerError';
import { usePreloadCaching } from '../../Hooks/usePreloadCaching';

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
        phase: 'IC',
    });

    usePreloadCaching();

    const [attachments, setAttachments] = useState<File[]>([]);
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const [errorMessage, setErrorMessage] = useState<ServerError | undefined>();

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
                await mutateAsync({ file: attachment, requestId: scID });
            });
            setIsRedirecting(true);

            redirect(scID);
        }
    };

    const { mutateAsync } = useMutation(uploadAttachment, { retry: 2, retryDelay: 2 });

    const { mutate, isLoading } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
        onError: (e: ServerError) => setErrorMessage(e),
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
            <ScopeChangeErrorBanner message={errorMessage} requestId={'0'} />
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
                        title: '',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
                <Section>
                    <Title>Attachments</Title>
                    <Upload attachments={attachments} setAttachments={setAttachments} />
                </Section>
            </GeneratedForm>
        </>
    );
};

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const Title = styled.div`
    line-height: 24px;
    font-size: 18px;
    color: black;
    font-weight: bold;
`;

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
