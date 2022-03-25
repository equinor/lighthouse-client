import { Tabs as EdsTabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
export const Tabs = styled(EdsTabs)`
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100%;
    width: 100%;
`;

export const DataViewWrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
    grid-row: 3/4;
    width: 100%;
    overflow: hidden;
`;

export const WorkspaceWrapper = styled.div<{ sideSheetWidth?: number }>`
    width: calc(100vw - ${({ sideSheetWidth }) => sideSheetWidth || 0}px);
`;
