import { FilterOptions } from '@equinor/filter';
import { ReleaseControl } from '../../types/releaseControl';

export const filterOptions: FilterOptions<ReleaseControl> = [
    {
        name: 'Current step',
        valueFormatter: (s) => (s.currentWorkflowStep ? s.currentWorkflowStep.name : null),
    },
    {
        name: 'State',
        valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
    },
    { name: 'Phase', valueFormatter: ({ phase }) => phase },
    { name: 'Status', valueFormatter: ({ workflowStatus }) => workflowStatus },
    {
        name: 'System',
        valueFormatter: ({ systems }) =>
            systems
                ?.map((system) => (system !== '' ? system : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Area',
        valueFormatter: ({ areas }) =>
            areas
                ?.map((area) => (area !== '' ? area : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'CommPk',
        valueFormatter: ({ commPkNos }) =>
            commPkNos
                ?.map((commPk) => (commPk !== '' ? commPk : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Switchboard',
        valueFormatter: ({ switchboards }) =>
            switchboards
                ?.map((switchboard) => (switchboard !== '' ? switchboard : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Circuit',
        valueFormatter: ({ circuits }) =>
            circuits
                ?.map((circuit) => (circuit !== '' ? circuit : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
];
