import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { Button, CircularProgress, Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useHttpClient } from '@equinor/portal-client';
import { openSidesheet } from '@equinor/sidesheet';

import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import {
    getScopeChangeById,
    postScopeChange,
    uploadAttachment,
} from '../../Api/ScopeChange/Request';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { ScopeChangeSideSheet } from '../Sidesheet/ScopeChangeSidesheet';

import { Upload } from '../Attachments/Upload';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { StidTypes } from '../../Types/STID/STIDTypes';
import { usePreloadCaching } from '../../Hooks/React-Query/usePreloadCaching';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';
import { useScopeChangeFormState } from './useScopeChangeFormState';
import { ScopeChangeBaseForm } from './ScopeChangeBaseForm';
import { ScopeChangeBaseModel } from '../../Types/scopeChangeRequest';
import {
    ActionBar,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
    Section,
} from './ScopeChangeForm.styles';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeParams {
    draft: boolean;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const [attachments, setAttachments] = useState<File[]>([]);
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);

    const { handleInput, isValid, state } = useScopeChangeFormState();

    usePreloadCaching();
    const queryClient = useQueryClient();

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const { scopeChange } = useHttpClient();

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeParams) => {
        const tags = filterElementsByType(relatedObjects, 'tag');
        const systems = filterElementsByType(relatedObjects, 'system');
        const commPkgs = filterElementsByType(relatedObjects, 'commpkg');
        const areas = filterElementsByType(relatedObjects, 'area');
        const disciplines = filterElementsByType(relatedObjects, 'discipline');
        const documents = filterElementsByType(relatedObjects, 'document');

        const validatedFormModel: ScopeChangeBaseModel = state as ScopeChangeBaseModel;
        const scID = await postScopeChange(
            {
                ...validatedFormModel,
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
            const { baseKey } = scopeChangeQueryKeys(scID);
            attachments.forEach(async (attachment) => {
                uploadAttachmentMutation({ file: attachment, requestId: scID });
            });
            setIsRedirecting(true);

            redirect(scID);
            queryClient.invalidateQueries(baseKey);
        }
    };

    const { mutate: uploadAttachmentMutation } = useMutation(uploadAttachment, {
        retry: 2,
        retryDelay: 2,
    });

    const { mutate, isLoading } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
    });

    const redirect = async (scopeChangeId: string) => {
        if (!scopeChangeId) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId));
        clearActiveFactory();
        queryClient.invalidateQueries();
    };

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
                <SidesheetTitle>Create scope change request</SidesheetTitle>
                <Icon
                    onClick={() => closeScrim()}
                    name="close"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </TitleHeader>

            <FormWrapper>
                <FlexColumn>
                    Request
                    <ScopeChangeBaseForm handleInput={handleInput} state={state} />
                </FlexColumn>

                <FlexColumn>
                    <Section>
                        <RelatedObjectsSearch
                            relatedObjects={relatedObjects}
                            setRelatedObjects={setRelatedObjects}
                        />
                    </Section>
                    Attachments
                    <Upload attachments={attachments} setAttachments={setAttachments} />
                </FlexColumn>
            </FormWrapper>
            <ActionBar>
                <ButtonContainer>
                    {isLoading ? (
                        <Button disabled={true}>
                            <Progress.Dots color="primary" />
                        </Button>
                    ) : (
                        <>
                            <Button onClick={() => mutate({ draft: false })} disabled={!isValid}>
                                Submit
                            </Button>
                            <Button
                                onClick={() => mutate({ draft: true })}
                                disabled={!isValid}
                                variant="outlined"
                            >
                                Save
                            </Button>
                        </>
                    )}
                </ButtonContainer>
            </ActionBar>
        </>
    );
};

export const SidesheetTitle = styled.span`
    font-size: 28px;
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
    padding: 1em 0em;
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
