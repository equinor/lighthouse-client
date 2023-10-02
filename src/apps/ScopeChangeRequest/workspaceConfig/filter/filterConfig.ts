import { FilterOptions, FilterValueType } from '../../../../packages/Filter/Types';
import { WorkflowStep } from '../../../../packages/Workflow/src';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import {
    calculateGuesstimateHoursGap,
    guesstimate,
    GuesstimateRanges,
} from './guesstimate/guesstimate';

export const filterConfig: FilterOptions<ScopeChangeRequest> = [
    {
        name: 'Category',
        valueFormatter: ({ changeCategory }) => changeCategory.name,
        isQuickFilter: true,
    },
    {
        name: 'State',
        valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
        defaultUncheckedValues: ['Voided', 'Draft'],
        isQuickFilter: true,
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
        isQuickFilter: true,
    },
    {
        name: 'Commissioning pack',
        valueFormatter: ({ commissioningPackages }) =>
            commissioningPackages.map((commPkg) => commPkg.procosysNumber),
        isQuickFilter: true,
    },
    {
        name: 'Has comments',
        valueFormatter: ({ hasComments }) => booleanToHumanReadable(hasComments),
        sort: (a) => a.sort(sortOnYesNo),
    },
    {
        name: 'Has contributors',
        valueFormatter: (s) => booleanToHumanReadable(hasContributor(s.workflowSteps)),
        sort: (a) => a.sort(sortOnYesNo),
    },
    {
        name: 'Pending contributions',
        valueFormatter: ({ hasPendingContributions }) =>
            booleanToHumanReadable(hasPendingContributions),
        sort: (a) => a.sort(sortOnYesNo),
    },
    {
        name: 'Workflow status',
        valueFormatter: ({ workflowStatus }) => workflowStatus,
        isQuickFilter: true,
    },
    {
        name: 'Disciplines',
        valueFormatter: ({ disciplineGuesstimates }) =>
            disciplineGuesstimates.map(({ discipline }) => discipline.procosysCode),
        isQuickFilter: true,
    },
    {
        name: 'Has revisions',
        valueFormatter: ({ revisionNumber }) => booleanToHumanReadable(revisionNumber > 1),
        sort: (s) => s.sort(sortOnYesNo),
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
    {
        name: 'Scope',
        valueFormatter: ({ scope }) => scope?.name,
    },
    {
        name: 'Potential warranty case',
        valueFormatter: (s) => booleanToHumanReadable(s.potentialWarrantyCase),
        sort: (a) => a.sort(sortOnYesNo),
    },
    {
        name: 'Potential ATS scope',
        valueFormatter: (s) => booleanToHumanReadable(s.potentialAtsScope),
        sort: (a) => a.sort(sortOnYesNo),
    },
    {
        name: 'Phase',
        valueFormatter: ({ phase }) => phase,
    },
];

function booleanToHumanReadable(val: boolean | undefined) {
    return val ? 'Yes' : 'No';
}

function sortOnYesNo(a: FilterValueType, b: FilterValueType) {
    return b === 'No' ? -1 : 1;
}

function hasContributor(workflowSteps: WorkflowStep[] | null) {
    if (workflowSteps?.length != undefined) {
        for (let i = 0; i < workflowSteps?.length; i++) {
            if (workflowSteps[i].contributors.length > 0) return true;
        }
    }
    return false;
}
