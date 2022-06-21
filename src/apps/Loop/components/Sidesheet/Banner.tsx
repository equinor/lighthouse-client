import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
//TODO Extract to package
export const Banner = styled.div<{ padding?: string }>`
    height: 76px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.hex};
    display: flex;
    flex-direction: row;
    gap: 5rem;
    padding: ${({ padding = 0 }) => `${padding}`};
    align-items: center;
`;
