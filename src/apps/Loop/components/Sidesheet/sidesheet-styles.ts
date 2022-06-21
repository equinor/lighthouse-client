import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const ItemLink = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: none;
    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
