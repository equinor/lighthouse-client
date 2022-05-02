import { Criteria, WorkflowStep } from '../../../../../../../types/scopeChangeRequest';
import { CriteriaStatus } from '../CriteriaDetail';

export function getCriteriaStatus(criteria: Criteria, step: WorkflowStep): CriteriaStatus {
    if (!criteria.signedState) {
        return step.isCurrent ? 'Active' : 'Inactive';
    } else {
        return criteria.signedState;
    }
}
