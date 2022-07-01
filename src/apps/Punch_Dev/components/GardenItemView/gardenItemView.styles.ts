import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Root = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
    position: relative;
`;
export type ItemProps = { backgroundColor: string; isSelected: boolean };

export const ItemWrapper = styled.div<ItemProps>`
    display: grid;
    grid-template-columns: 3fr auto;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    background: ${(props) => props.backgroundColor};
    color: ${tokens.colors.text.static_icons__default.rgba};
    cursor: pointer;
    border: 1px solid #ededed;
    height: 100%;
    border-radius: 5px;
    font-weight: 500;
    font-size: 13px;
    padding-left: 20px;
    padding-right: 2px;
    outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
    outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
`;
export const ItemText = styled.div`
    grid-column: 1/2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
