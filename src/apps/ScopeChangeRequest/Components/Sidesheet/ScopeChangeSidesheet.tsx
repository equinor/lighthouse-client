import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';

import { getScopeChangeById } from '../../Api/getScopeChange';
import { getContributionId } from '../../Functions/Access';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { ScopeChangeRequestEditForm } from '../Form/ScopeChangeRequestEditForm';
import { useScopeChangeAccess } from '../../Hooks/useScopeChangeAccess';
import { useWorkflowAccess } from '../../Hooks/useWorkflowAccess';
import { ScopeChangeAccessContext } from './Context/scopeChangeAccessContext';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [performingAction, setPerformingAction] = useState<boolean>(false);

    const { error, data, refetch, remove, isLoading } = useQuery<ScopeChangeRequest>(
        'scopeChange',
        () => getScopeChangeById(item.id, scopeChangeApi),
        { refetchOnMount: true, initialData: item }
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

    useEffect(() => {
        if (!performingAction) {
            setTimeout(async () => await refetch(), 200);
        }
    }, [performingAction]);

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
                <div>Failed to fetch scope change request, please check your connection?</div>
            )}
            <TitleHeader>
                <Title>Review scope change request</Title>
                <Button
                    variant="ghost_icon"
                    onClick={() => setEditMode(!editMode)}
                    disabled={!scopeChangeAccess.canPatch}
                >
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
                    performingAction,
                    setPerformingAction,
                    request: data || item,
                    requestAccess: scopeChangeAccess,
                    signableCriterias: workflowAccess.signableCriterias,
                    refetch: refetchScopeChange,
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

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 650px;
    height: 100vh;
`;
