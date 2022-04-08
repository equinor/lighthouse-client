import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';

export const gardenConfig: GardenOptions<ScopeChangeRequest> = {
    gardenKey: 'state',
    itemKey: 'sequenceNumber',
    type: 'normal',
    fieldSettings: {
        CurrentStep: {
            getKey: (test) => test.currentWorkflowStep?.name ?? '(Blank)',
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
        ChangeCategory: {
            getKey: ({ changeCategory }) => changeCategory.name,
            label: 'Change category',
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
