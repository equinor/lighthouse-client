import { useEffect } from 'react';

import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';
import { getScopeChangeById } from '../Api/getScopeChange';
import { useQuery } from 'react-query';
import { useApiClient } from '@equinor/portal-client';
import { CircularProgress } from '@equinor/eds-core-react';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const { scopeChange: scopeChangeApi } = useApiClient();

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
                <Field
                    label={'Review scope change request'}
                    value=""
                    customLabel={{ fontSize: 'xx-large' }}
                />
            </TitleHeader>
            {data && <RequestViewContainer request={data} refetch={updateScopeChange} />}
        </Wrapper>
    );
};

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
