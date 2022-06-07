import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Item } from '../../../../components/ParkView/Styles/item';

export type ReleaseControlItemProps = {
    backgroundColor: string;
    textColor: string;
    isGrouped: boolean;
    isExpanded: boolean;
    isSelected: boolean;
};

export const ReleaseControlItem = styled(Item) <ReleaseControlItemProps>`
    display: flex;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: ${(props) => (props.isGrouped ? '90%' : '100%')};
    margin-left: ${(props) => (props.isGrouped ? '14px' : null)};
    min-width: 100px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-between;
    padding: 0.18rem 0.5rem;
    border: ${({ isSelected }) => (isSelected ? '2px dashed green' : '1px solid #dcdcdc ')};
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

export const SubGroupWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    align-items: center;
    margin-bottom: 4px;
    border: 1px solid ${tokens.colors.text.static_icons__tertiary.rgba};
    border-radius: 5px;
    color: ${tokens.colors.text.static_icons__default.rgba};
    width: 98%;
    height: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const SubGroupText = styled.div`
    display: flex;
    margin-left: 4px;
    font-variant-numeric: tabular-nums;
`;

export const HTSubGroupText = styled.div`
    display: flex;
    margin-left: 4px;
    margin-top: 2px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    text-decoration: underline;

    :hover {
        opacity: 0.5;
    }
`;

export const HTGardenSubGroup = styled.div`
    display: flex;
`;

export const Chevron = styled.div`
    cursor: pointer;

    :hover {
        opacity: 0.5;
    }
`;
