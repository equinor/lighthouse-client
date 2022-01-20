import { useHttpClient } from '@equinor/portal-client';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getScopeChangeById } from '../Api/getScopeChange';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Field } from './DetailView/Components/Field';
import { RequestViewContainer } from './RequestDetailViewContainer';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest>(item);
    const { customApi } = useHttpClient('api://df71f5b5-f034-4833-973f-a36c2d5f9e31/.default');

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
