import styled from 'styled-components';

// export const Tabs = styled(EdsTabs)`
//     display: grid;
//     grid-template-rows: auto auto 1fr;
//     height: 100%;
//     width: 100%;
// `;

export const DataViewWrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
    grid-row: 3/4;
    width: 100%;
    overflow: hidden;
`;

export const WorkspaceWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Loading = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5em;
`;
