import React, { useEffect, useState } from 'react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';
import { getScopeChangeById } from '../Api/getScopeChange';

interface ScopeChangeSideSheetProps {
    object: ScopeChangeRequest;
}

export const ScopeChangeSideSheet = ({ object }: ScopeChangeSideSheetProps): JSX.Element => {
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest>();

    const refetch = async () => {
        if (scopeChange?.id) {
            setScopeChange(await getScopeChangeById(scopeChange.id));
        }
    };

    useEffect(() => {
        setScopeChange(object);
    }, [object]);

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
