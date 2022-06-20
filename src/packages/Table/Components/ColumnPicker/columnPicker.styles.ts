import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const MenuItem = styled.div`
    height: 48px;
    grid-template-columns: 1fr 2fr;
    width: 200px;
    display: grid;
    align-items: center;

    > span {
        padding: 0px;

        > svg {
            width: 18px;
            height: 18px;
        }

        :first-child {
            padding-right: 2px;
        }
    }
    :hover {
        cursor: grab;
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;

export const WrapperDiv = styled.div`
    position: absolute;
    right: 20px;
    top: 40px;
    height: auto;
    width: auto;
    padding: 10px;
    background-color: white;
    max-height: calc(100vh - 350px);
    max-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
`;

export const ColumnLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2em;
    padding: 1em 1em 0em 0em;
    color: ${tokens.colors.interactive.primary__resting.hex};
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    text-align: center;
    cursor: pointer;
`;
