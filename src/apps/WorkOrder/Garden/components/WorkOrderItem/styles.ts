import styled from 'styled-components';

export const Root = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
`;
export type WorkOrderItemProps = {
    backgroundColor: string;
    textColor: string;
    background: string;
    isSelected: boolean;
};
//@ts-ignore
export const WorkOrderWrapper = styled.div<WorkOrderItemProps>`
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    min-width: 150px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
    outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
`;

export const Circles = styled.div`
    display: flex;
    padding-right: 0px 8px;
`;

export const Progress = styled.span<{ background: string }>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${(props) => props.background};
`;

export const MidSection = styled.div<{ expanded: boolean }>`
    display: flex;
    justify-content: ${(p) => (p.expanded ? 'flex-start' : 'center')};
    flex: 1;
    padding: ${(p) => (p.expanded ? '0px 8px' : '0px')};
`;
export const WorkorderExpanded = styled.div`
    display: flex;
    flex: 1;
`;

export const WorkorderExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding: 0px 8px;
`;
