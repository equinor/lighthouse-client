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
];
