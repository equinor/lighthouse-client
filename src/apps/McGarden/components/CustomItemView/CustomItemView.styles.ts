import styled from 'styled-components';
export const Root = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
`;
export type McItemProps = { backgroundColor: string; textColor: string };
export const McWrapper = styled.div<McItemProps>`
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 95%;
    min-width: 150px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
`;
