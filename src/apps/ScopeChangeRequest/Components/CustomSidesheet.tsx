import React, { useEffect, useState } from 'react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';
import { getScopeChangeById } from '../Api/getScopeChange';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest>();

    const refetch = async () => {
        if (scopeChange?.id) {
            setScopeChange(await getScopeChangeById(scopeChange.id));
        }
    };

    useEffect(() => {
        setScopeChange(item);
    }, [item]);

    return (
        <>
            <p>Test</p>
            {scopeChange && !!Object.keys(scopeChange).length && (
                <>
                    <Wrapper>
                        <TitleHeader>
                            <Field
                                label={'Review scope change request'}
                                value=""
                                customLabel={{ fontSize: 'xx-large' }}
                            />
                        </TitleHeader>
                        <RequestViewContainer request={scopeChange} refetch={refetch} />
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
