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
        name: 'MC status',
        valueFormatter: (mc) => mc.mcStatus,
        customValueRender: (mcStatus) => <McStatusFilter status={mcStatus as McStatus} />,
        sort: (filterValues) =>
            filterValues.sort(
                (a, b) => mcStatusPriority[a as McStatus] - mcStatusPriority[b as McStatus]
            ),
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
        defaultHidden: true,
    },

    {
        name: 'Subsystem',
        valueFormatter: (mc) => mc.subsystem,
        defaultHidden: true,
    },
    {
        name: 'Remark',
        valueFormatter: (mc) => mc.remark,
        defaultHidden: true,
    },

    {
        name: 'M-01 Contractor Final Punch Actual Date',
        valueFormatter: (mc) => (mc.finalPunchActualDate ? 'Yes' : 'No'),
        defaultHidden: true,
    },
    {
        name: 'M-02 Punch Status Accepted Actual Date',
        valueFormatter: (mc) => (mc.punchAcceptActualDate ? 'Yes' : 'No'),
        defaultHidden: true,
    },
    {
        name: 'M-03 RFC MC to Commissioning Actual Date',
        valueFormatter: (mc) => (mc.rfccForecastDate || mc.rfccPlannedDate ? 'Yes' : 'No'),
        defaultHidden: true,
    },
    {
        name: 'M-03 RFCC Actual Date',
        valueFormatter: (mc) => (mc.rfccActualDate ? 'Yes' : 'No'),
        defaultHidden: true,
    },

    {
        name: 'Commissioning Priority 2',
        valueFormatter: (mc) => mc.priority2 || 'N/A',
        defaultHidden: true,
    },
    {
        name: 'Commissioning Priority 3',
        valueFormatter: (mc) => mc.priority3 || 'N/A',
        defaultHidden: true,
    },
];
