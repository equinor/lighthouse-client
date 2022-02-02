import styled from 'styled-components';
import { RequestActionsContainer } from '../../../requestDetailViewStyles';
import React from 'react';
import { RequestDraftActions } from './RequestDraftActions';
import { RequestOpenActions } from './RequestOpenActions';
import { VoidRequestButton } from './VoidRequestButton';
import { useScopeChangeAccessContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';

export const RequestActionBar = (): JSX.Element | null => {
    const { request } = useScopeChangeAccessContext();

    if (request.isVoided) {
        return (
            <RequestActionsContainer>
                <VoidRequestButton />
            </RequestActionsContainer>
        );
    }

    return (
        <RequestActionsContainer>
            {request.state === 'Draft' && <RequestDraftActions />}
            {request.state === 'Open' && <RequestOpenActions />}
        </RequestActionsContainer>
    );
};

export const ButtonContainer = styled.div`
    display: flex;
    padding: 0em 1em 1em 1em;
    justify-content: space-between;
    align-items: baseline;
`;

export const HorizontalDivider = styled.div`
    margin: 0.2em;
`;
