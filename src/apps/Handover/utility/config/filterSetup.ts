import { HandoverPackage } from '../../Garden/models';
import { getFilterDateValues } from '../helpers/getFilterDateValues';
import { daysDiff } from '../helpers/daysDiff';
import { getStatus } from '../../Garden/utility';
import { FilterOptions } from '@equinor/filter';

export const filterConfig: FilterOptions<HandoverPackage> = [
    {
        name: 'Commpkgno',
        valueFormatter: ({ commpkgNo }) => commpkgNo,
    },
    {
        name: 'Discipline',
        valueFormatter: ({ mcDisciplineCodes }) => mcDisciplineCodes,
        isQuickFilter: true,
    },

    {
        name: 'Comm pkg status',
        valueFormatter: (pkg) => getStatus(pkg),
        isQuickFilter: true,
    },
    {
        name: 'MC status',
        valueFormatter: ({ mcStatus }) => mcStatus,
        isQuickFilter: true,
    },
    {
        name: 'Responsible',
        valueFormatter: ({ responsible }) => responsible,
        isQuickFilter: true,
    },
    {
        name: 'Area',
        valueFormatter: ({ area }) => area,
    },
    {
        name: 'Phase',
        valueFormatter: ({ phase }) => phase,
    },

    {
        name: 'System',
        valueFormatter: ({ system }) => system,
        isQuickFilter: true,
    },

    {
        name: 'Priority 1',
        valueFormatter: ({ priority1 }) => priority1,
    },
    {
        name: 'Priority 2',
        valueFormatter: ({ priority2 }) => priority2,
    },
    {
        name: 'Priority 3',
        valueFormatter: ({ priority3 }) => priority3,
    },
    {
        name: 'Planned RFC',
        valueFormatter: ({ plannedStartDate, mcPkgsCount, mcPkgsRFCCShippedCount }) => {
            const dateDiffs = daysDiff(new Date(plannedStartDate));
            if (
                mcPkgsCount > 0 &&
                mcPkgsRFCCShippedCount > 0 &&
                mcPkgsCount !== mcPkgsRFCCShippedCount &&
                dateDiffs.days <= 0
            ) {
                return 'Overdue';
            } else {
                return getFilterDateValues(dateDiffs.days);
            }
        },
    },
    {
        name: 'Forecast RFC',
        valueFormatter: ({ forecastStartDate, mcPkgsCount, mcPkgsRFCCShippedCount }) => {
            const dateDiffs = daysDiff(new Date(forecastStartDate));
            if (
                mcPkgsCount > 0 &&
                mcPkgsRFCCShippedCount > 0 &&
                mcPkgsCount !== mcPkgsRFCCShippedCount &&
                dateDiffs.days <= 0
            ) {
                return 'Overdue';
            } else {
                return getFilterDateValues(dateDiffs.days);
            }
        },
    },
    {
        name: 'Planned RFO',
        valueFormatter: ({ rfocPlannedDate, mcPkgsRFOCShipped, mcPkgsCount }) => {
            const dateDiffs = daysDiff(new Date(rfocPlannedDate));
            if (
                mcPkgsCount > 0 &&
                mcPkgsRFOCShipped > 0 &&
                mcPkgsCount !== mcPkgsRFOCShipped &&
                dateDiffs.days <= 0
            ) {
                return 'Overdue';
            } else {
                return getFilterDateValues(dateDiffs.days);
            }
        },
    },
    {
        name: 'Actual RFO',
        valueFormatter: ({ rfocActualDate, mcPkgsCount, mcPkgsRFOCShipped }) => {
            const dateDiffs = daysDiff(new Date(rfocActualDate));
            if (
                mcPkgsCount > 0 &&
                mcPkgsRFOCShipped > 0 &&
                mcPkgsCount !== mcPkgsRFOCShipped &&
                dateDiffs.days <= 0
            ) {
                return 'Overdue';
            } else {
                return getFilterDateValues(dateDiffs.days);
            }
        },
    },
];
