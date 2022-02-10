import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon, Progress } from '@equinor/eds-core-react';

import { getScopeChangeById, unVoidRequest, voidRequest } from '../../Api/ScopeChange';
import { getContributionId } from '../../Functions/Access';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { ScopeChangeRequestEditForm } from '../Form/ScopeChangeRequestEditForm';

import { useWorkflowAccess } from '../../Hooks/useWorkflowAccess';
import { ScopeChangeAccessContext } from './Context/scopeChangeAccessContext';
import { useScopeChangeAccess } from '../../Hooks/useScopeChangeAccess';
import { IconMenu, MenuItem } from '../MenuButton';
import { ErrorFormat, ScopeChangeErrorBanner } from './ErrorBanner';

import { QueryKeys } from '../../Api/ScopeChange/queryKeys';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const queryClient = useQueryClient();
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorFormat | undefined>();

    const { data, refetch, remove, isLoading } = useQuery<ScopeChangeRequest>(
        QueryKeys.Scopechange,
        () => getScopeChangeById(item.id, scopeChangeApi),
        {
            initialData: item,
            refetchOnWindowFocus: false,
            retry: false,
            onError: () =>
                setErrorMessage({
                    message: ' Network error, please check your connection and try again',
                    timestamp: new Date(),
                }),
        }
    );
    const scopeChangeAccess = useScopeChangeAccess(item.id);

    const workflowAccess = useWorkflowAccess(
        item.id,
        data?.currentWorkflowStep?.criterias,
        data?.currentWorkflowStep?.contributors,
        data?.currentWorkflowStep?.id,
        getContributionId
    );

    useEffect(() => {
        if (item) {
            remove();
            refetchScopeChange();
        }
    }, [item]);

    async function notifyChange() {
        await queryClient.invalidateQueries(QueryKeys.History);
        await queryClient.invalidateQueries(QueryKeys.Scopechange);
    }

    const refetchScopeChange = async () => {
        await refetch();
    };
    const actionMenu: MenuItem[] = useMemo(() => {
        const actions: MenuItem[] = [];

        if (scopeChangeAccess.canVoid) {
            if (data?.isVoided) {
                actions.push({
                    label: 'Unvoid request',
                    onClick: () => unVoidRequest(item.id).then(notifyChange),
                });
            } else {
                actions.push({
                    label: 'Void request',
                    onClick: () => voidRequest(item.id).then(notifyChange),
                });
            }
        }
        return actions;
    }, [data?.isVoided, item.id, scopeChangeAccess.canVoid]);

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
            <ScopeChangeErrorBanner
                timestamp={errorMessage?.timestamp}
                message={errorMessage?.message}
            />

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
            <ScopeChangeAccessContext.Provider
                value={{
                    setErrorMessage: (message: string) =>
                        setErrorMessage({ message: message, timestamp: new Date() }),
                    contributionId: workflowAccess.contributionId,
                    request: data || item,
                    requestAccess: scopeChangeAccess,
                    signableCriterias: workflowAccess.signableCriterias,
                    canAddContributor: workflowAccess.canAddContributor,
                    notifyChange,
                }}
            >
                {data && (
                    <div>
                        {editMode ? (
                            <ScopeChangeRequestEditForm
                                request={data}
                                cancel={() => setEditMode(false)}
                            />
                        ) : (
                            <RequestDetailView />
                        )}
                    </div>
                )}
            </ScopeChangeAccessContext.Provider>
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
