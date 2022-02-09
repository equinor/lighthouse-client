import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon, Progress } from '@equinor/eds-core-react';

import { getScopeChangeById, voidRequest } from '../../Api/ScopeChange';
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

import { QueryKeys } from '../../Api/ScopeChange/queryKeys';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const queryClient = useQueryClient();
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);

    const { error, data, refetch, remove, isLoading } = useQuery<ScopeChangeRequest>(
        QueryKeys.Scopechange,
        () => getScopeChangeById(item.id, scopeChangeApi),
        { initialData: item, refetchOnWindowFocus: false, retry: false }
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
        await queryClient.invalidateQueries([QueryKeys.History, QueryKeys.Scopechange]);
        await queryClient.refetchQueries(QueryKeys.Scopechange);
        await queryClient.refetchQueries(QueryKeys.History);
    }

    const refetchScopeChange = async () => {
        await refetch();
    };
    const actionMenu: MenuItem[] = useMemo(() => {
        const actions: MenuItem[] = [];

        if (scopeChangeAccess.canVoid) {
            actions.push({
                label: `${data?.isVoided ? 'Unvoid request' : 'Void request'}`,
                onClick: () => voidRequest(item.id).then(notifyChange),
            });
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
            {error && (
                <div style={{ color: 'red' }}>
                    Network error, please check your connection and try again
                </div>
            )}
            <TitleHeader>
                <Title>
                    {data?.title}
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
