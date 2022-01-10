import React, { useEffect, useState } from 'react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';
import { getScopeChangeById } from '../Api/getScopeChange';
import { openSidesheet } from '../../../packages/Sidesheet/Functions';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest>();

    const refetch = async () => {
        if (scopeChange?.id) {
            const newScopeChange = await getScopeChangeById(scopeChange.id);
            setScopeChange(newScopeChange);
            openSidesheet(ScopeChangeSideSheet, newScopeChange);
        }
    };

    useEffect(() => {
        setScopeChange(item);
    }, [item]);

    return (
        <>
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
