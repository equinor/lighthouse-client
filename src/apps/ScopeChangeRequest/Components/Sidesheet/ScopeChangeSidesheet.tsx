import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';

import { getScopeChangeById } from '../../Api/ScopeChange';
import { getContributionId } from '../../Functions/Access';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { ScopeChangeRequestEditForm } from '../Form/ScopeChangeRequestEditForm';

import { useWorkflowAccess } from '../../Hooks/useWorkflowAccess';
import { ScopeChangeAccessContext } from './Context/scopeChangeAccessContext';
import { useScopeChangeAccess } from '../../Hooks/useScopeChangeAccess';
import { IconMenu } from '../MenuButton';

import { QueryKeys } from '../../Api/ScopeChange/queryKeys';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const queryClient = useQueryClient();
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);

    const { error, data, refetch, remove, isLoading } = useQuery<ScopeChangeRequest>(
        QueryKeys.scopechange,
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
        await queryClient.invalidateQueries([QueryKeys.history, QueryKeys.scopechange]);
        await queryClient.refetchQueries(QueryKeys.scopechange);
        await queryClient.refetchQueries(QueryKeys.history);
    }

    const refetchScopeChange = async () => {
        await refetch();
    };

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
                <Title>{data?.title}</Title>
                <Button
                    variant="ghost_icon"
                    onClick={() => setEditMode(!editMode)}
                    disabled={!scopeChangeAccess.canPatch}
                >
                    <IconMenu
                        items={[
                            {
                                label: 'Void request',
                            },
                        ]}
                    />
                    <Divider />
                    <Icon
                        color={
                            scopeChangeAccess.canPatch
                                ? tokens.colors.interactive.primary__resting.hex
                                : 'grey'
                        }
                        name="edit"
                    />
                </Button>
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

const TitleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Divider = styled.div`
    width: 0.3rem;
`;

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1200px;
    height: 100vh;
`;
