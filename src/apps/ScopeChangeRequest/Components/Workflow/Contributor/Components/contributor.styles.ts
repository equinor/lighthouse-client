import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ContributorContainer = styled.div`
    padding: 0px 32px;
    width: -webkit-fill-available;
    margin-bottom: 0.5rem;
`;

export const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;

export const Spacer = styled.div`
    height: 9px;
    width: 0.5rem;
`;

export const ContributorInnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    width: -webkit-fill-available;
    &:hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.hex};
    }
`;

export const Inline = styled.span`
    display: flex;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0.2rem;
`;

export const Divider = styled.div`
    width: 0.5rem;
`;
