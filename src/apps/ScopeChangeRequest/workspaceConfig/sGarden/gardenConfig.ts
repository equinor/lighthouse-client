import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';

const workflowStatusMap = new Map([
    ['Initiate', 1],
    ['Initiate request', 2],
    ['Initiated', 3],
    ['Review by coordinator', 4],
    ['Reviewed', 5],
    ['Approved', 6],
    ['MC Scoping Completed', 7],
    ['Completed', 8],
    ['Rejected', 9],
]);

export const gardenConfig: GardenOptions<ScopeChangeRequest> = {
    gardenKey: 'state',
    objectIdentifier: 'id',
    itemKey: 'sequenceNumber',
    customDescription: (s) => s.title,
    fieldSettings: {
        CurrentStep: {
            getKey: ({ currentWorkflowStep }) => currentWorkflowStep?.name ?? '(Blank)',
            label: 'Current step',
        },
        Status: {
            getKey: ({ workflowStatus }) => workflowStatus ?? '(Blank)',
            label: 'Workflow status',
            getColumnSort: (a, b) => {
                const aN = workflowStatusMap.get(a);
                const bN = workflowStatusMap.get(b);
                if (!aN || !bN) return 0;
                return aN - bN;
            },
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
