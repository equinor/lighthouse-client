import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const ActionSelectorHeight = '280px';

export const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(87vh - ${ActionSelectorHeight});
    overflow: scroll;
`;

export const HorizontalDivider = styled.div`
    margin: 0.2em;
`;

export const RequestActionsContainer = styled.div`
    border-top: solid 2.5px ${tokens.colors.ui.background__medium.rgba};
    display: flex;
    background-color: white;
    width: 650px;
    height: ${ActionSelectorHeight};
    flex-direction: column;
    position: fixed;
    bottom: 0px;
`;

export const LogMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0em;
`;
