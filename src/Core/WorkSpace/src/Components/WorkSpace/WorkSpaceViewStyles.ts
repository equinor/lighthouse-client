import styled from 'styled-components';

export const DataViewWrapper = styled.div<{ sideSheetWidth: number }>`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
    grid-row: 3/4;
    width: calc(100% - ${({ sideSheetWidth }) => sideSheetWidth}px);
    height: 100%;
    overflow: hidden;
`;

export const WorkspaceWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
