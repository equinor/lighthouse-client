import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { DataSet } from '../../../components/ParkView/Models/data';
import { CustomHeaderView } from '../../../components/ParkView/Models/gardenOptions';
import { Count, Groupe, Title } from '../../../components/ParkView/Styles/common';
import { SwcrPackage } from '../models/SwcrPackage';
import { DATE_BLANKSTRING, DEFAULT_BLANKSTRING } from '../utilities/packages';

const MinorTitle = styled(Count)`
    min-height: 0.8rem;
    margin: 0px;
    padding: 0px;
`;

const Header = styled(Groupe)`
    flex-direction: column;
    height: 46px;
    width: 100%;
    min-width: 50px;
    box-sizing: border-box;
    ::after {
        content: ' ';
        position: relative;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: ${tokens.colors.ui.background__info.rgba};
    }
`;

const HeaderTitle = styled(Title)`
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

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

export function SwcrHeaderView({ garden, columnKey }: CustomHeaderView<SwcrPackage>): JSX.Element {
    const column = garden[columnKey];
    const { count, groupKey } = column;
    const title = getTitle(groupKey, column);

    return (
        <Header title={title}>
            <MinorTitle>{getMinorTitle(groupKey, column)}</MinorTitle>
            <HeaderTitle>{title}</HeaderTitle>
            <MinorTitle>{count}</MinorTitle>
        </Header>
    );
}
