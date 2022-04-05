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
    width: ${(props) => (props.isGrouped ? '85%' : '100%')};
    margin-left: ${(props) => (props.isGrouped ? '22px' : null)};
    min-width: 100px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-between;
    border: 1px solid #dcdcdc;
    padding: 0.18rem 0.5rem;
`;

export const MidSection = styled.div<{ expanded: boolean }>`
    display: flex;
    flex: 1;
    padding: ${(p) => (p.expanded ? '0px 8px' : '0px')};
    font-size: 14px;
    font-weight: 500;
    margin-left: 8px;
    text-align: end;
    font-variant-numeric: tabular-nums;
`;

export const Icons = styled.div`
    display: flex;
    padding-right: 8px;
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
