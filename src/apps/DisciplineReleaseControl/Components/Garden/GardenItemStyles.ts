import styled from 'styled-components';
import { Item } from '../../../../components/ParkView/Styles/item';

export type ReleaseControlItemProps = {
    backgroundColor: string;
    textColor: string;
    isGrouped: boolean;
    isExpanded: boolean;
};

export const ReleaseControlItem = styled(Item)<ReleaseControlItemProps>`
    display: flex;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: ${(props) => (props.isExpanded ? '100%' : '200px')};
    margin-left: ${(props) => (props.isGrouped ? '32px' : null)};
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-between;
    border: 1px solid #dcdcdc;
`;

export const MidSection = styled.div<{ expanded: boolean }>`
    display: flex;
    justify-content: ${(p) => (p.expanded ? 'flex-start' : 'center')};
    flex: 1;
    padding: ${(p) => (p.expanded ? '0px 8px' : '0px')};
`;

export const Circles = styled.div`
    display: flex;
    padding-right: 0px 8px;
`;

export const Title = styled.div``;

export const ReleaseControlExpanded = styled.div`
    display: flex;
    flex: 1;
`;

export const ReleaseControlExpandedTitle = styled.div`
    display: flex;
    flex: 1;
    padding: 0px 8px;
`;
