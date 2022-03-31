import { FilterOptions } from '../../../packages/Filter/Types';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export const filterConfig: FilterOptions<ScopeChangeRequest> = [
    {
        name: 'Phase',
        valueFormatter: (item) => item.phase,
    },
    {
        name: 'Category',
        valueFormatter: (item) => item.changeCategory.name,
    },
    {
        name: 'State',
        valueFormatter: (item) => (item.isVoided ? 'Voided' : item.state),
        defaultUncheckedValues: ['Voided', 'Draft'],
        defaultHidden: true,
    },
    {
        name: 'Next to sign',
        valueFormatter: (item) =>
            item.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)
                ?.valueDescription ?? null,
    },
    {
        name: 'Origin',
        valueFormatter: (item) => item.originSource,
    },
    {
        name: 'Step',
        valueFormatter: (item) => item.currentWorkflowStep?.name ?? null,
    },
];
