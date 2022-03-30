import styled from 'styled-components';
import { Item } from '../../../../../components/ParkView/Styles/item';
export type WorkOrderItemProps = { backgroundColor: string; textColor: string; background: string };
//@ts-ignore
export const WorkOrderWrapper = styled(Item)<WorkOrderItemProps>`
    position: relative;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    border: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
