import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const FilterGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    min-width: 200px;
    padding: 0.5rem;
    height: 180px;
`;
export const CheckboxWrap = styled.span`
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 0.3rem;
    overflow-x: hidden;
    overflow-y: scroll;
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
    display: flex;
    align-items: center;
    > label {
        font-size: 1rem;
        cursor: pointer;
    }
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
