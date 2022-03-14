import { FilterOptions } from '../../../packages/Filter/Types';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

const scopeChangeExcludeFilterKeys: (keyof ScopeChangeRequest)[] = [
    'id',
    'currentWorkflowStep',
    'workflowSteps',
    'isVoided',
    'state',
    'originSource',
    'originSourceId',
];

export const filterConfig: FilterOptions<ScopeChangeRequest> = {
    excludeKeys: scopeChangeExcludeFilterKeys,
    headerNames: {},
    defaultActiveFilters: ['State', 'phase', 'category', 'Origin', 'Step', 'NextToSign'],
    defaultUncheckedValues: [
        {
            type: 'State',
            value: {
                Voided: { checked: false, type: 'State', value: 'Voided' },
                Draft: { checked: false, type: 'State', value: 'Draft' },
            },
        },
    ],
    valueFormatter: {
        NextToSign: (item: ScopeChangeRequest): string => {
            if (item.state !== 'Open') {
                return 'Closed';
            }
            return (
                item.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)
                    ?.valueDescription ?? '(Blank)'
            );
        },
        State: (item: ScopeChangeRequest): string => {
            if (item.isVoided) {
                return 'Voided';
            }
            return item.state;
        },
        Origin: (item: ScopeChangeRequest) => {
            return item.originSource;
        },
        Step: (item: ScopeChangeRequest) => {
            return item?.currentWorkflowStep?.name ?? '(Blank)';
        },
    },
};
