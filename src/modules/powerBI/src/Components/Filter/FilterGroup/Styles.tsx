import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0rem 0.5rem;
    word-wrap: break-word;
    height: -webkit-fill-available;
    max-width: 500px;
`;

export const FilterGroupContainer = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 0.3rem;
    }
`;
export const CheckboxWrap = styled.span`
    display: flex;
    flex-direction: column;
    span {
        padding: 2px;
        font-size: 1rem;
    }
    svg {
        height: 18px;
        width: 18px;
    }
`;

export const CheckboxItem = styled.div`
    display: flex;
    align-items: center;
    > label {
        font-size: 13px;
    }
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
