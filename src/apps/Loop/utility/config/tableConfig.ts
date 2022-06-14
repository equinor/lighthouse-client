import { TableOptions } from '@equinor/WorkSpace';
import { Loop } from '../../types/loop';
const hiddenColumns: (keyof Loop)[] = [
    'c01PlannedDate',
    'c01ForecastDate',
    'c07ForecastDate',
    'c07PlannedDate',
];
export const tableConfig: TableOptions<Loop> = {
    objectIdentifierKey: 'loopNo',
    itemSize: 32,
    hiddenColumns,
};
