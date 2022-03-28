import { Button, CircularProgress } from '@equinor/eds-core-react';
import { openSidesheet } from '@equinor/sidesheet';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useHttpClient } from '../../../../Core/Client/Hooks';
import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { ScopeChangeBaseModel } from '../../Types/scopeChangeRequest';
import { StidTypes } from '../../Types/STID/STIDTypes';
import { ScopeChangeErrorBanner } from '../Sidesheet/ErrorBanner';
import { ScopeChangeSideSheet } from '../Sidesheet/ScopeChangeSidesheet';
import { useOctopusErrorHandler } from '../Sidesheet/useOctopusErrorHandler';
import { ActionBar, ButtonContainer } from './ScopeChangeForm.styles';
import { ScopeChangeRequestForm } from './ScopeChangeRequestForm';
import { useScopeChangeFormState } from './useScopeChangeFormState';
import {
    getScopeChangeById,
    postScopeChange,
    uploadAttachment,
} from '../../Api/ScopeChange/Request';

interface DataCreatorWrapperProps {
    closeScrim: () => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeParams {
    draft: boolean;
}

export const DataCreatorWrapper = ({
    closeScrim,
    setHasUnsavedChanges,
}: DataCreatorWrapperProps): JSX.Element => {
    useOctopusErrorHandler();
    const formState = useScopeChangeFormState();
    const { state, isValid } = formState;

    const queryClient = useQueryClient();

    const { scopeChange } = useHttpClient();

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeParams) => {
        const tags = state.references && filterElementsByType(state.references, 'tag');
        const systems = state.references && filterElementsByType(state.references, 'system');
        const commPkgs = state.references && filterElementsByType(state.references, 'commpkg');
        const areas = state.references && filterElementsByType(state.references, 'area');
        const disciplines =
            state.references && filterElementsByType(state.references, 'discipline');
        const documents = state.references && filterElementsByType(state.references, 'document');

        const validatedFormModel: ScopeChangeBaseModel = formState.state as ScopeChangeBaseModel;
        const scID = await postScopeChange(
            {
                ...validatedFormModel,
                tagNumbers: tags?.map((x) => x.value) || [],
                systemIds: systems?.map((x) => Number(x.value)) || [],
                commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
                documentNumbers: documents?.map((x) => x.value) || [],
                areaCodes: areas?.map((x) => x.value) || [],
                disciplineCodes: disciplines?.map((x) => x.value) || [],
            },
            draft,
            scopeChange
        );
        if (scID) {
            const { baseKey } = scopeChangeQueryKeys(scID);
            state?.attachments?.forEach(async (attachment) => {
                uploadAttachmentMutation({ file: attachment, requestId: scID });
            });

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

    return (
        <>
            <ScopeChangeErrorBanner />
            <Wrapper>
                <ScopeChangeRequestForm
                    formState={formState}
                    closeScrim={closeScrim}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                />
                <ActionBar>
                    <ButtonContainer>
                        {isLoading ? (
                            <Button variant="ghost_icon">
                                <CircularProgress size={32} color="primary" />
                            </Button>
                        ) : (
                            <>
                                <Button
                                    disabled={!isValid}
                                    onClick={() => mutate({ draft: false })}
                                >
                                    Submit
                                </Button>
                                <Button
                                    disabled={!isValid}
                                    onClick={() => mutate({ draft: true })}
                                    variant="outlined"
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </ButtonContainer>
                </ActionBar>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`;

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}
