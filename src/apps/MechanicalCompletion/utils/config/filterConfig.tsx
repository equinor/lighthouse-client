import { FilterOptions } from '@equinor/filter';
import { McPackage } from '../../types';

export const filterConfig: FilterOptions<McPackage> = [
    {
        name: 'MC status',
        valueFormatter: (mc) => mc.mcStatus,
    },
    {
        name: 'Responsible',
        valueFormatter: (mc) => mc.responsible,
    },
    {
        name: 'Discipline',
        valueFormatter: (mc) => mc.discipline,
    },
    {
        name: 'MC Package Phase',
        valueFormatter: (mc) => mc.phase,
    },
    {
        name: 'System',
        valueFormatter: (mc) => mc.system,
    },
    {
        name: 'Subsystem',
        valueFormatter: (mc) => mc.subsystem,
    },
    {
        name: 'Remark',
        valueFormatter: (mc) => mc.remark,
    },
    {
        name: 'M-01 Contractor Final Punch Actual Date',
        valueFormatter: (mc) => (mc.finalPunchActualDate ? 'Yes' : 'No'),
    },
    {
        name: 'M-02 Punch Status Accepted Actual Date',
        valueFormatter: (mc) => (mc.punchAcceptActualDate ? 'Yes' : 'No'),
    },
    {
        name: 'M-03 RFC MC to Commissioning Actual Date',
        valueFormatter: (mc) => (mc.rfccForecastDate || mc.rfccPlannedDate ? 'Yes' : 'No'),
    },
    {
        name: 'M-03 RFCC Actual Date',
        valueFormatter: (mc) => (mc.rfccActualDate ? 'Yes' : 'No'),
    },
    {
        name: 'Commissioning Priority 1',
        valueFormatter: (mc) => mc.priority || 'N/A',
    },
    {
        name: 'Commissioning Priority 2',
        valueFormatter: (mc) => mc.priority2 || 'N/A',
    },
    {
        name: 'Commissioning Priority 3',
        valueFormatter: (mc) => mc.priority3 || 'N/A',
    },
];
