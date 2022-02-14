import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: 250px;
    min-width: 200px;
    word-wrap: break-word;
    height: 180px;
    gap: 0.5rem;
`;

export const FilterGroupContainer = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
`;
export const CheckboxWrap = styled.span`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    span {
        padding: 2px;
        font-size: 1rem;
    }

    svg {
        height: 16px;
        width: 16px;
    }
`;

export const CheckboxItem = styled.div`
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
