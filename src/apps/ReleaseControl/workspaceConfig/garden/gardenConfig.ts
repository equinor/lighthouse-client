import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { ReleaseControl } from '../../types/releaseControl';

export const gardenOptions: GardenOptions<ReleaseControl> = {
    gardenKey: 'Status' as keyof ReleaseControl,
    itemKey: 'sequenceNumber',
    type: 'normal',
    collapseSubGroupsByDefault: true,
    fieldSettings: {
        CurrentStep: {
            getKey: ({ currentWorkflowStep }) => currentWorkflowStep?.name ?? '(Blank)',
            label: 'Current step',
        },
        Status: {
            getKey: ({ workflowStatus }) => workflowStatus ?? '(Blank)',
            label: 'Workflow status',
        },
        State: {
            getKey: ({ state, isVoided }) => (isVoided ? 'Voided' : state),
            label: 'State',
        },
    },
    intercepters: {
        postGroupSorting: (data) =>
            data.map((group) => ({
                ...group,
                items: group.items.sort((a, b) => a.sequenceNumber - b.sequenceNumber),
            })),
    },
};
