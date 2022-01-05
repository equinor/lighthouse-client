import React, { useEffect, useState } from 'react';
import { Button, Icon } from '@equinor/eds-core-react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';
import { getScopeChangeById } from '../Api/getScopeChange';

interface CustomSidesheetProps<T> {
    item: T;
    onClose: () => void;
}
export const CustomSidesheet = ({
    item,
    onClose,
}: CustomSidesheetProps<ScopeChangeRequest>): JSX.Element => {
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
            {scopeChange && !!Object.keys(scopeChange).length && (
                <>
                    <Wrapper>
                        <TitleHeader>
                            <Field
                                label={'Review scope change request'}
                                value=""
                                customLabel={{ fontSize: 'xx-large' }}
                            />
                            <Button variant="ghost_icon" onClick={onClose}>
                                <Icon name="close" />
                            </Button>
                        </TitleHeader>

                        <RequestViewContainer
                            close={onClose}
                            request={scopeChange}
                            refetch={refetch}
                        />
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
