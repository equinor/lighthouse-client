import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon, Progress } from '@equinor/eds-core-react';

import { getScopeChangeById, unVoidRequest, voidRequest } from '../../Api/ScopeChange/Request';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { ScopeChangeRequestEditForm } from '../Form/ScopeChangeRequestEditForm';

import { ScopeChangeContext } from './Context/scopeChangeAccessContext';
import { useScopeChangeAccess } from '../../Hooks/useScopeChangeAccess';
import { IconMenu, MenuItem } from '../MenuButton';
import { ScopeChangeErrorBanner } from './ErrorBanner';

import { QueryKeys } from '../../Api/ScopeChange/queryKeys';
import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { ServerError } from '../../Api/ScopeChange/Types/ServerError';
import { useScopeChangeMutation } from '../../Hooks/useScopechangeMutation';
import { MutationKeys } from '../../Api/ScopeChange/mutationKeys';
import { usePreloadCaching } from '../../Hooks/usePreloadCaching';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ServerError | undefined>();
    const queryClient = useQueryClient();

    /**
     * Preloads systems, functional roles and other static low memory lists
     */
    usePreloadCaching();

    const { data, refetch, remove, isLoading, isRefetching } = useQuery<ScopeChangeRequest>(
        QueryKeys.Scopechange,
        () => getScopeChangeById(item.id, scopeChangeApi),
        {
            initialData: item,
            refetchOnWindowFocus: false,
            retry: false,
            onError: () =>
                setErrorMessage({
                    detail: 'Failed to connect to server',
                    title: 'Fetch failed',
                    validationErrors: {},
                }),
        }
    );

    const scopeChangeAccess = useScopeChangeAccess(item.id);

    const { mutateAsync: unvoidMutation } = useScopeChangeMutation(
        [MutationKeys.Unvoid],
        unVoidRequest
    );

    const { mutateAsync: voidMutation } = useScopeChangeMutation([MutationKeys.Void], voidRequest);

    const refetchScopeChange = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const actionMenu: MenuItem[] = useMemo(() => {
        const actions: MenuItem[] = [];

        if (scopeChangeAccess.canUnVoid) {
            if (data?.isVoided) {
                actions.push({
                    label: 'Unvoid request',
                    onClick: async () => await unvoidMutation({ requestId: item.id }),
                });
            }
        }
        if (scopeChangeAccess.canVoid) {
            if (!data?.isVoided) {
                actions.push({
                    label: 'Void request',
                    onClick: () =>
                        spawnConfirmationDialog(
                            'Are you sure you want to void this request',
                            'Void confirmation',
                            async () => await voidMutation({ requestId: item.id })
                        ),
                });
            }
        }

        return actions;
    }, [
        data?.isVoided,
        item.id,
        scopeChangeAccess.canUnVoid,
        scopeChangeAccess.canVoid,
        unvoidMutation,
        voidMutation,
    ]);

    useEffect(() => {
        if (item.id) {
            remove();
            refetchScopeChange();
            queryClient.invalidateQueries(QueryKeys.Step);
        }
    }, [item.id, queryClient, refetchScopeChange, remove]);

    if (!item.id) {
        return <p>Something went wrong</p>;
    }

    if (isLoading) {
        return (
            <Loading>
                <CircularProgress size={48} value={0} />
            </Loading>
        );
    }
    return (
        <Wrapper>
            <ScopeChangeErrorBanner message={errorMessage} requestId={item.id} />
            <TitleHeader>
                <Title>
                    ({data?.sequenceNumber}) {data?.title}
                    {isLoading && <Progress.Dots color="primary" />}
                </Title>
                <ButtonContainer>
                    <IconMenu items={actionMenu} />

                    <Button
                        variant="ghost_icon"
                        onClick={() => setEditMode(!editMode)}
                        disabled={!scopeChangeAccess.canPatch}
                    >
                        <Icon
                            color={
                                scopeChangeAccess.canPatch
                                    ? tokens.colors.interactive.primary__resting.hex
                                    : tokens.colors.interactive.disabled__text.hex
                            }
                            name="edit"
                        />
                    </Button>
                </ButtonContainer>
            </TitleHeader>
            <ScopeChangeContext.Provider
                value={{
                    isRefetching: isRefetching,
                    setErrorMessage: (message: ServerError) => setErrorMessage(message),
                    request: data || item,
                    requestAccess: scopeChangeAccess,
                }}
            >
                {data && (
                    <div>
                        {editMode ? (
                            <ScopeChangeRequestEditForm
                                request={data}
                                close={() => setEditMode(false)}
                            />
                        ) : (
                            <RequestDetailView />
                        )}
                    </div>
                )}
            </ScopeChangeContext.Provider>
        </Wrapper>
    );
};

const Title = styled.div`
    font-size: 28px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3em;
`;

const TitleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1200px;
    height: 100vh;
`;
