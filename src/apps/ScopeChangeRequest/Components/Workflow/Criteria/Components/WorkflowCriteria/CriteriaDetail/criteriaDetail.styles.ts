import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const DetailText = styled.div`
    font-size: 14px;
`;

export const SplitInline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
`;

export const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;
