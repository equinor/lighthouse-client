import styled from 'styled-components';
import { Item } from '../../../../../components/ParkView/Styles/item';

export type HandoverItemProps = { backgroundColor: string; textColor: string };

export const HandoverItem = styled(Item)<HandoverItemProps>`
    display: flex;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 100%;
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-between;
`;

export const MidSection = styled.div<{ expanded: boolean }>`
    display: flex;
    justify-content: ${(p) => (p.expanded ? 'flex-start' : 'center')};
    flex: 1;
    padding: ${(p) => (p.expanded ? '0px 8px' : '0px')};
`;

export const Icons = styled.div`
    display: flex;
    width: 28px;
`;

export const Title = styled.div``;

export const HandoverExpanded = styled.div`
    display: flex;
    flex: 1;
`;

export const HandoverExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding: 0px 8px;
`;

export const Circles = styled.div`
    display: flex;
    padding-right: 0px 8px;
`;
