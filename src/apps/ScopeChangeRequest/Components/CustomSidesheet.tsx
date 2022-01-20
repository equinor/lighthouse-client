import React, { useEffect, useState } from 'react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';
import { getScopeChangeById } from '../Api/getScopeChange';
import { useQuery } from 'react-query';
import { useApiClient } from '@equinor/portal-client';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest>(item);
    const { customApi } = useApiClient('api://df71f5b5-f034-4833-973f-a36c2d5f9e31/.default');

    /**
     * Refetches every second
     */
    const { error, data, refetch } = useQuery<ScopeChangeRequest>(
        'scopeChange',
        () => getScopeChangeById(item.id, customApi),
        { refetchInterval: 1000 }
    );

    useEffect(() => {
        if (item) {
            setScopeChange(item);
        }
    }, [item]);

    useEffect(() => {
        if (data) {
            setScopeChange(data);
        }
    }, [data]);

    if (!item.id) {
        return <p>Something went wrong</p>;
    }

    const updateScopeChange = async () => {
        await refetch();
    };

    return (
        <>
            {scopeChange && !!Object.keys(scopeChange).length && (
                <>
                    <Wrapper>
                        {error && (
                            <div>
                                Failed to fetch scope change request, please check your connection?
                            </div>
                        )}
                        <TitleHeader>
                            <Field
                                label={'Review scope change request'}
                                value=""
                                customLabel={{ fontSize: 'xx-large' }}
                            />
                        </TitleHeader>
                        <RequestViewContainer request={scopeChange} refetch={updateScopeChange} />
                    </Wrapper>
                </>
            )}
        </>
    );
};

const TitleHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;
