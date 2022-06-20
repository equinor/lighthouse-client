import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const MenuItem = styled.div`
    /* display: grid; */
    height: 48px;
    /* text-overflow: ellipsis;
    white-space: nowrap;
    grid-template-columns: 2fr 4fr 8fr;
    margin: -5px -5px;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    text-align: left; */
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
