import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { scopeChangeWorkflowStatusSortOrder } from '../dataOptions';
import { ScopechangeGardenItem } from './CustomItemView';

const statusMap = scopeChangeWorkflowStatusSortOrder.readAtomValue().items.map(({ name }) => name);

export const gardenConfig: GardenOptions<ScopeChangeRequest> = {
    gardenKey: 'Status' as keyof ScopeChangeRequest,
    itemKey: 'sequenceNumber',
    type: 'normal',
    customViews: {
        customItemView: ScopechangeGardenItem,
    },
    fieldSettings: {
        CurrentStep: {
            getKey: ({ currentWorkflowStep }) => currentWorkflowStep?.name ?? '(Blank)',
            label: 'Current step',
        },
        Status: {
            getKey: ({ workflowStatus }) => workflowStatus ?? '(Blank)',
            label: 'Workflow status',
            getColumnSort: (a, b) => {
                const aN = statusMap.findIndex((name) => name === a);
                const bN = statusMap.findIndex((name) => name === b);
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
