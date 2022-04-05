import { FilterOptions } from '../../../../packages/Filter/Types';
import { HandoverPackage } from '../../Garden/models';
import { getFilterDateValues } from '../helpers/getFilterDateValues';

export const filterConfig: FilterOptions<HandoverPackage> = [
    //     {
    //         name: 'Commpkgno',
    //         valueFormatter: ({ commpkgNo }) => commpkgNo,
    //         defaultHidden: true,
    //     },
    //     {
    //         name: 'Discipline',
    //         valueFormatter: ({ mcDisciplineCodes }) => mcDisciplineCodes,
    //     },

    //     {
    //         name: 'Comm pkg status',
    //         valueFormatter: ({ commpkgStatus }) => commpkgStatus,
    //     },
    //     {
    //         name: 'MC status',
    //         valueFormatter: ({ mcStatus }) => mcStatus,
    //     },
    //     {
    //         name: 'Responsible',
    //         valueFormatter: ({ responsible }) => responsible,
    //     },
    //     {
    //         name: 'Area',
    //         valueFormatter: ({ area }) => area,
    //         defaultHidden: true,
    //     },
    //     {
    //         name: 'Phase',
    //         valueFormatter: ({ phase }) => phase,
    //         defaultHidden: true,
    //     },

    //     {
    //         name: 'System',
    //         valueFormatter: ({ system }) => system,
    //     },

    //     {
    //         name: 'Priority 1',
    //         valueFormatter: ({ priority1 }) => priority1,
    //     },
    //     {
    //         name: 'Priority 2',
    //         valueFormatter: ({ priority2 }) => priority2,
    //         defaultHidden: true,
    //     },
    //     {
    //         name: 'Priority 3',
    //         valueFormatter: ({ priority3 }) => priority3,
    //     },
    {
        name: 'Planned RFC',
        valueFormatter: ({ plannedStartDate, actualStartDate }) =>
            getFilterDateValues(new Date(plannedStartDate), actualStartDate),
    },
    {
        name: 'Forecast RFC',
        valueFormatter: ({ forecastStartDate, actualStartDate }) =>
            getFilterDateValues(new Date(forecastStartDate), actualStartDate),
        defaultHidden: true,
    },
    {
        name: 'Planned RFO',
        valueFormatter: ({ rfocPlannedDate, rfocActualDate }) =>
            getFilterDateValues(new Date(rfocPlannedDate), rfocActualDate),
    },
    {
        name: 'Actual RFO',
        valueFormatter: ({ rfocActualDate }) =>
            getFilterDateValues(new Date(rfocActualDate), rfocActualDate),
    },
];
