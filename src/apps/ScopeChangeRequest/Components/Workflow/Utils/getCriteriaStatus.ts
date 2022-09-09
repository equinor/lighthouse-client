import { Criteria, CriteriaStatus } from '../../../types/scopeChangeRequest';

export function getCriteriaStatus(criteria: Criteria, isCurrentStep: boolean): CriteriaStatus {
    if (!criteria.signedState) {
        return isCurrentStep ? 'Active' : 'Inactive';
    }
    return criteria.signedState;
}
