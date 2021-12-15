import React from 'react';
import { Button } from '@equinor/eds-core-react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';
import styled from 'styled-components';
import { Field } from './DetailView/Components/Field';

interface CustomSidesheetProps<T> {
    item: T;
    onClose: () => void;
}
export const CustomSidesheet = ({
    item,
    onClose,
}: CustomSidesheetProps<ScopeChangeRequest>): JSX.Element => {
    return (
        <>
            {item && !!Object.keys(item).length && (
                <>
                    <Wrapper>
                        <TitleHeader>
                            <Field
                                label={'Review scope change request'}
                                value=""
                                customLabel={{ fontSize: 'xx-large' }}
                            />
                            <Button variant="ghost_icon" onClick={onClose}>
                                <h2>x</h2>
                            </Button>
                        </TitleHeader>

                        <RequestViewContainer close={onClose} request={item} />
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
