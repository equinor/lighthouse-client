import { sortByNumber } from '@equinor/GardenUtils';
import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';
import { McPackage } from '../../types';
import { getDateKey } from '../helpers/getGroupByKey';
export type ExtendedGardenFields = 'finalPunch' | 'punchAccepted' | 'rfcmc' | 'rfcc';
export const fieldSettings: FieldSettings<McPackage, ExtendedGardenFields> = {
    finalPunch: {
        label: 'M-01 Contractor final punch',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    punchAccepted: {
        label: 'M-02 Punch Status Accepted',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    rfcmc: {
        label: 'M-03 RFC MC to Commissioning',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    rfcc: {
        label: 'M-04 RFCC',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    responsible: {
        label: 'MC package Responsible',
    },
    discipline: {
        label: 'MC Package Discipline',
    },
    area: {
        label: 'MC Package Area',
    },
    phase: {
        label: 'MC Package Phase',
    },
    commPkgNumber: {
        label: 'Commissioning Package',
    },
    system: {
        label: 'System',
    },
    subsystem: {
        label: 'Subsystem',
    },
    remark: {
        label: 'Remark',
    },
    priority: {
        label: 'Commissioning Priority 1',
    },
    priority2: {
        label: 'Commissioning Priority 2',
    },
    priority3: {
        label: 'Commissioning Priority 3',
    },
};
