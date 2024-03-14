import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
    gap: 0.8em;
`;

export const Monospace = styled.div`
    font-variant-numeric: tabular-nums;
`;

export const StyledRowView = styled.div`
    display: flex;
    gap: 0.3em;
`;
