import { DateTime } from 'luxon';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export function getLastSigned(request: ScopeChangeRequest): DateTime | null {
    if (!request || request.state === 'Draft') return null;

    const dateArray: DateTime[] = [];
    if (!request.workflowSteps) return null;
    request.workflowSteps.forEach((step) =>
        step.criterias.forEach((criteria) => {
            if (criteria.signedAtUtc) {
                dateArray.push(DateTime.fromJSDate(new Date(criteria.signedAtUtc)));
            }
        })
    );

    const maxDate = DateTime.max(...dateArray);
    if (!maxDate) return null;
    return maxDate;
}
