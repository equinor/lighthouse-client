import styled from 'styled-components';

export const CenterIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;
export const StateCircle = styled.div<{ color: string }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
`;
