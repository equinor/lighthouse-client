import styled from 'styled-components';
import { Item } from '../../../../components/ParkView/Styles/item';

export type ReleaseControlItemProps = { backgroundColor: string; textColor: string };

export const ReleaseControlItem = styled(Item)<ReleaseControlItemProps>`
    display: flex;
    background: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 180px;
    margin-left: 52px;
    min-width: 150px;
    box-sizing: border-box;
    white-space: nowrap;
    justify-content: space-between;
    border: 1px solid #dcdcdc;
`;

export const MidSection = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 0px;
`;

export const Title = styled.div``;
