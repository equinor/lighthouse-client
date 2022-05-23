import { FilterOptions } from '@equinor/filter';
import { ReleaseControl } from '../../ReleaseControlApp';

export const filterOptions: FilterOptions<ReleaseControl> = [
    { name: 'Current step', valueFormatter: (s) => s?.currentWorkflowStep.name },
    {
        name: 'State',
        valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
    },
    { name: 'Phase', valueFormatter: ({ phase }) => phase },
    { name: 'Status', valueFormatter: ({ workflowStatus }) => workflowStatus },
];
