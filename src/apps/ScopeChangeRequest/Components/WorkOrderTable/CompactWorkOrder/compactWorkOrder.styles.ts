import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Link = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: underline;
    cursor: pointer;
`;

export const Header = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
`;

export const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 2fr 2fr 2fr;
    column-gap: 2em;
`;
