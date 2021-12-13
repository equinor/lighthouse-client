import React from 'react';
import { Button } from '@equinor/eds-core-react';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Wrapper } from '../Styles/SidesheetWrapper';
import { RequestViewContainer } from './RequestDetailViewContainer';

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
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={() => onClose()}>X</Button>
                        </div>
                        <RequestViewContainer close={onClose} request={item} />
                    </Wrapper>
                </>
            )}
        </>
    );
};
