import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';
import { WorkOrder } from '../models';
import { columnKeyAccessor } from './groupByUtils';
import { sortByNumber } from './sortPackages';
export type ExtendedGardenFields = 'fwp' | 'hwp' | 'wp';
export const fieldSettings: FieldSettings<WorkOrder, ExtendedGardenFields> = {
    wp: {
        label: 'Workorder production',
        getKey: columnKeyAccessor,
        getColumnSort: sortByNumber,
    },
    hwp: {
        label: 'Hours ready for execution at site',
        getKey: columnKeyAccessor,
        getColumnSort: sortByNumber,
    },
    fwp: {
        label: 'Finalizing of workorder at site',
        getKey: columnKeyAccessor,
        getColumnSort: sortByNumber,
    },
    responsibleCode: {
        label: 'Responsible',
    },
    disciplineCode: {
        label: 'Discipline',
    },
    milestone: {
        label: 'Milestone',
    },
};
