import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
    height: 16px;
    width: 68px;
    background-color: #f5f5f5;
    border-bottom: 2px #dcdcdc solid;
    width: -webkit-fill-available;
    position: relative;
`;

export const ActualProgress = styled.div<{ width: number; borderColor?: string; color?: string }>`
    background-color: ${({ color }) => `${color ?? '#CCE6F3'}`};
    width: ${({ width }) => `${width}%`};
    height: 16px;
    border-bottom: ${({ borderColor }) => `2px ${borderColor ?? '#0084C4'} solid`};
`;
