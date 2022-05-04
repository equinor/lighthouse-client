import styled from 'styled-components';

export const WorkflowRow = styled.div`
    border-radius: 5px;
    font-size: 16px;
    grid-column: col 2 / span 3;
    grid-row: auto;
`;

export const WorkflowWrapper = styled.div`
    display: grid;
    column-gap: 10px;
    grid-template-columns: [col] 24px [col] 100px [col] auto [col] auto;
    grid-template-rows: [row] auto [row] auto [row];
    background-color: #fff;
    color: #444;
    padding: 3px 0px;
`;

export const RowContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
