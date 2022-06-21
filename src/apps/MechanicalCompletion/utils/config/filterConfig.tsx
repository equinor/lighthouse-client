import { FilterOptions } from '@equinor/filter';
import { HandoverStatusFilter, McStatusFilter } from '../../components';
import { CommissioningStatus, McPackage, McStatus } from '../../types';
import { mcStatusPriority } from '../helpers';
import { getCommissioningStatus } from '../helpers/getStatuses';
import { commissioningStatusOrder } from './commStatusOrder';

export const filterConfig: FilterOptions<McPackage> = [
    {
        name: 'System',
        valueFormatter: (mc) => mc.system,
        isQuickFilter: true,
    },
    {
        name: 'Responsible',
        valueFormatter: (mc) => mc.responsible,
        isQuickFilter: true,
    },
    {
        name: 'Discipline',
        valueFormatter: (mc) => mc.discipline,
        isQuickFilter: true,
    },
    {
        name: 'MC status',
        valueFormatter: (mc) => mc.mcStatus,
        customValueRender: (mcStatus) => <McStatusFilter status={mcStatus as McStatus} />,
        sort: (filterValues) =>
            filterValues.sort(
                (a, b) => mcStatusPriority[a as McStatus] - mcStatusPriority[b as McStatus]
            ),
        isQuickFilter: true,
    },
    {
        name: 'Handover Status',
        valueFormatter: (mc) => {
            return getCommissioningStatus(mc);
        },
        sort: (filterValues) =>
            filterValues.sort(
                (a, b) =>
                    commissioningStatusOrder[a as CommissioningStatus] -
                    commissioningStatusOrder[b as CommissioningStatus]
            ),
        customValueRender: (filterValue) => {
            return <HandoverStatusFilter status={filterValue as CommissioningStatus} />;
        },
        isQuickFilter: true,
    },

    {
        name: 'MC Package Phase',
        valueFormatter: (mc) => mc.phase,
    },
    {
        name: 'Commissioning Priority 1',
        valueFormatter: (mc) => mc.priority || 'N/A',
    },
    {
        name: 'Area',
        valueFormatter: (mc) => mc.area,
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
        name: 'M-04 RFCC Actual Date',
        valueFormatter: (mc) => (mc.rfccActualDate ? 'Yes' : 'No'),
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
