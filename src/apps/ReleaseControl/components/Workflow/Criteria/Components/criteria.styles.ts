import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface VerticalLineProps {
    active: boolean;
}

export const VerticalLine = styled.div<VerticalLineProps>`
    border-left: 1px solid
        ${({ active }) => (active ? tokens.colors.interactive.primary__resting.hex : '#DCDCDC')};
    height: 100%;
    width: 1px;
    margin-top: 5px;
`;

export const DetailText = styled.div`
    font-size: 14px;
`;

export const WorklowIconAndLine = styled.div`
    grid-column: col / span 1;
    grid-row: 1 / span 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5em;
    align-items: center;
    gap: 0.5em;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;
export const StyledPersonInfoTooltip = styled.div`
    position: absolute;
    z-index: 1;
    color: #fff;
    background-color: #121212;
    padding: 5px;
    border-radius: 4px;
    margin-top: 5px;
    margin-left: 15px;
    white-space: pre;
`;
