import { FilterOptions } from '../../../../packages/Filter/Types';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import {
    calculateGuesstimateHoursGap,
    guesstimate,
    GuesstimateRanges,
} from './guesstimate/guesstimate';

export const filterConfig: FilterOptions<ScopeChangeRequest> = [
    {
        name: 'Phase',
        valueFormatter: ({ phase }) => phase,
        defaultHidden: true,
    },
    {
        name: 'Category',
        valueFormatter: ({ changeCategory }) => changeCategory.name,
    },
    {
        name: 'State',
        valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
        defaultUncheckedValues: ['Voided', 'Draft'],
    },
    {
        name: 'Next to sign',
        valueFormatter: ({ currentWorkflowStep }) =>
            currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)?.valueDescription ??
            null,
    },
    {
        name: 'Origin',
        valueFormatter: ({ originSource }) => originSource,
    },
    {
        name: 'Step',
        valueFormatter: ({ currentWorkflowStep }) => currentWorkflowStep?.name ?? null,
    },
    {
        name: 'Has comments',
        valueFormatter: ({ hasComments }) => (hasComments ? 'Yes' : 'No'),
        sort: (a) => a.sort((_, b) => (b === 'No' ? -1 : 1)),
    },
    {
        name: 'Pending contributions',
        valueFormatter: ({ hasPendingContributions }) => (hasPendingContributions ? 'Yes' : 'No'),
        sort: (a) => a.sort((_, b) => (b === 'No' ? -1 : 1)),
    },
    {
        name: 'Workflow status',
        valueFormatter: ({ workflowStatus }) => workflowStatus,
    },
    {
        name: 'Disciplines',
        valueFormatter: ({ disciplineGuesstimates }) =>
            disciplineGuesstimates.map(({ discipline }) => discipline.procosysCode),
    },
    {
        name: 'Guesstimate',
        valueFormatter: ({ disciplineGuesstimates }) =>
            disciplineGuesstimates.length > 0
                ? calculateGuesstimateHoursGap(
                    disciplineGuesstimates.reduce((count, curr) => curr.guesstimate + count, 0)
                )
                : null,

        sort: (a) =>
            a.sort((a, b) => {
                if (typeof a !== 'string' || typeof b !== 'string') return 0;

                const aN = guesstimate.get(a as GuesstimateRanges);
                const bN = guesstimate.get(b as GuesstimateRanges);
                if (!aN || !bN) return 0;
                return aN - bN;
            }),
    },
];
