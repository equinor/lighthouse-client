import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { useHttpClient } from '@equinor/portal-client';
import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';

import { getScopeChangeById } from '../Api/getScopeChange';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { RequestDetailView } from './DetailView/RequestDetailView';
import { ScopeChangeRequestEditForm } from './Form/ScopeChangeRequestEditForm';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [editMode, setEditMode] = useState<boolean>(false);
    /**
     * Refetches every second
     */
    const { error, data, refetch, remove, isLoading } = useQuery<ScopeChangeRequest>(
        'scopeChange',
        () => getScopeChangeById(item.id, scopeChangeApi),
        { refetchInterval: 3000, refetchOnMount: true, initialData: item }
    );

    useEffect(() => {
        if (item) {
            remove();
            updateScopeChange();
        }
    }, [item]);

    if (!item.id) {
        return <p>Something went wrong</p>;
    }

    const updateScopeChange = async () => {
        await refetch();
    };

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
                <Button variant="ghost_icon" onClick={() => setEditMode(!editMode)}>
                    <Icon color={tokens.colors.interactive.primary__resting.hex} name="edit" />
                </Button>
            </TitleHeader>
            {data && (
                <div>
                    {editMode ? (
                        <ScopeChangeRequestEditForm
                            request={data}
                            cancel={() => setEditMode(false)}
                        />
                    ) : (
                        <RequestDetailView
                            request={data}
                            setEditMode={setEditMode}
                            refetch={updateScopeChange}
                        />
                    )}
                </div>
            )}
            {/* {data && <RequestViewContainer request={data} refetch={updateScopeChange} />} */}
        </Wrapper>
    );
};

const Title = styled.div`
    font-size: 28px;
`;

const TitleHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 650px;
    height: 100vh;
`;
