import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ReassignPadding = styled.div`
    padding: 0em 0.5em;
    width: 100%;
`;

export const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 48px;
    align-items: center;
    width: -webkit-fill-available;
    &:hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.hex};
    }
`;

export const Inline = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;
