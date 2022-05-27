import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const PackageRoot = styled.div`
    position: absolute;
    will-change: transform;
    top: 0;
    left: 0;
`;
export const DefaultPackage = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 2em;
    background-color: #d9e9f2;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    border: ${({ isSelected }) =>
        isSelected ? `2px dashed ${tokens.colors.interactive.primary__resting.hex}` : undefined};
`;
