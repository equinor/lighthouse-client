import { memo } from 'react';
import styled from 'styled-components';
import { DataSet } from '../../../components/ParkView/Models/data';
import { CustomHeaderView } from '../../../components/ParkView/Models/gardenOptions';
import { SwcrPackage } from '../models/SwcrPackage';
import { DATE_BLANKSTRING, DEFAULT_BLANKSTRING } from '../utilities/packages';

const getMinorTitle = (groupKey: string, column: DataSet<SwcrPackage>): string => {
    if (column.value === DEFAULT_BLANKSTRING || column.value === DATE_BLANKSTRING) return '';

    switch (groupKey) {
        case 'RFCC':
        case 'RFCCDueDate':
        case 'startImplForecast':
        case 'RFOC':
        case 'closedAtDate':
        case 'dueAtDate': {
            return column.value.split('-')[0] || '';
        }
        default:
            return '';
    }
};

const getTitle = (groupKey: string, column: DataSet<SwcrPackage>): string => {
    switch (groupKey) {
        case 'dueAtDate': {
            if (column.value === 'No Date') return column.value;

            return 'W' + column.value.split('-')[1]?.padStart(2, '0') || '';
        }
        default:
            return column.value;
    }
};
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: center;
    font-weight: 600;
`;

function SwcrHeaderView({ garden, columnIndex }: CustomHeaderView<SwcrPackage>): JSX.Element {
    const column = garden[columnIndex];
    const { groupKey } = column;
    const title = getTitle(groupKey, column);

    return (
        <HeaderContainer>
            <div>{getMinorTitle(groupKey, column)}</div>
            <div>{title}</div>
        </HeaderContainer>
    );
}
export default memo(SwcrHeaderView);
