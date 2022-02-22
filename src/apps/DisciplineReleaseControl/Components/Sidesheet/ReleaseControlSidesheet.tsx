import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon, Progress } from '@equinor/eds-core-react';

import { tokens } from '@equinor/eds-tokens';
import { useReleaseControlAccess } from '../../Hooks/useReleaseControlAccess';

import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { IconMenu, MenuItem } from '../MenuButton';
import { ReleaseControlContext } from './Context/releaseControlAccessContext';
import { QueryKeys } from '../../Api/queryKeys';
import { ServerError } from '../../Api/Types/ServerError';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { unVoidProcess, voidProcess } from '../../Api/Request/voidProcess';
import { getReleaseControlById } from '../../Api/Request/getReleaseControl';
import { ProcessDetailView } from '../DetailView/ProcessDetailView';
import { ReleaseControlErrorBanner } from './ErrorBanner';
import { DisciplineReleaseControl } from '../../Types/disciplineReleaseControl';

export const ReleaseControlSidesheet = (item: DisciplineReleaseControl): JSX.Element => {
    const { releaseControls } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ServerError | undefined>();
    const queryClient = useQueryClient();

    const { data, refetch, remove, isLoading, isRefetching } = useQuery<DisciplineReleaseControl>(
        QueryKeys.Scopechange,
        () => getReleaseControlById(item.id, releaseControls),
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

    const releaseControlAccess = useReleaseControlAccess(item.id);

    useEffect(() => {
        if (item.id) {
            remove();
            refetchScopeChange();
        }
    }, [item.id]);

    const notifyChange = useCallback(async () => {
        await queryClient.fetchQuery(QueryKeys.History);
        await queryClient.fetchQuery(QueryKeys.Scopechange);
    }, [queryClient]);

    const refetchScopeChange = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const actionMenu: MenuItem[] = useMemo(() => {
        const actions: MenuItem[] = [];

        if (releaseControlAccess.canUnVoid) {
            if (data?.isVoided) {
                actions.push({
                    label: 'Unvoid process',
                    onClick: () => unVoidProcess(item.id).then(notifyChange),
                });
            }
        }
        if (releaseControlAccess.canVoid) {
            if (!data?.isVoided) {
                actions.push({
                    label: 'Void process',
                    onClick: () =>
                        spawnConfirmationDialog(
                            'Are you sure you want to void this request',
                            'Void confirmation',
                            () => voidProcess(item.id).then(notifyChange)
                        ),
                });
            }
        }

        return actions;
    }, [
        data?.isVoided,
        item.id,
        notifyChange,
        releaseControlAccess.canUnVoid,
        releaseControlAccess.canVoid,
    ]);

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
            <ReleaseControlErrorBanner message={errorMessage} />

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
                        disabled={!releaseControlAccess.canPatch}
                    >
                        <Icon
                            color={
                                releaseControlAccess.canPatch
                                    ? tokens.colors.interactive.primary__resting.hex
                                    : tokens.colors.interactive.disabled__text.hex
                            }
                            name="edit"
                        />
                    </Button>
                </ButtonContainer>
            </TitleHeader>
            <ReleaseControlContext.Provider
                value={{
                    isRefetching: isRefetching,
                    setErrorMessage: (message: ServerError) => setErrorMessage(message),
                    process: data || item,
                    requestAccess: releaseControlAccess,
                }}
            >
                {data && (
                    <div>
                        {/* {editMode ? (
                            <ScopeChangeRequestEditForm
                                request={data}
                                close={() => setEditMode(false)}
                            />
                        ) : (
                            <RequestDetailView />
                        )} */}
                        <ProcessDetailView />
                    </div>
                )}
            </ReleaseControlContext.Provider>
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
