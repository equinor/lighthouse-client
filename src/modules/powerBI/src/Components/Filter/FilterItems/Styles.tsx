import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const FilterGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0rem 0.5rem;
    height: -webkit-fill-available;
    min-width: 150px;
`;

export const CheckboxWrap = styled.span`
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
    span {
        padding: 2px;
        font-size: 13px;
    }
    svg {
        height: 18px;
        width: 18px;
    }

    ::-webkit-scrollbar {
        width: 0.3rem;
    }
`;

export const CheckboxItem = styled.div`
    display: flex;
    align-items: center;
    > label {
        font-size: 13px;
        cursor: pointer;
    }
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
