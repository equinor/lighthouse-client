import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    height: auto;
    flex-direction: column;
    overflow: scroll;
`;

export const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ButtonContainer = styled.div`
    display: flex;
    padding: 0em 1em 1em 1em;
    justify-content: space-between;
`;

export const HorizontalDivider = styled.div`
    margin: 0.2em;
`;

export const RequestActionsContainer = styled.div`
    border-top: solid 2.5px ${tokens.colors.ui.background__medium.rgba};
    display: flex;
    background-color: white;
    width: 650px;
    height: auto;
    flex-direction: column;
`;

export const LogMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0em;
`;
