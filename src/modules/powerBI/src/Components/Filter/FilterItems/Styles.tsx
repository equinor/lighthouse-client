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
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    > label {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;

export const VirtualFilterItemWrapper = styled.div`
    width: auto;
    min-width: 150px;
    position: relative;
`;
