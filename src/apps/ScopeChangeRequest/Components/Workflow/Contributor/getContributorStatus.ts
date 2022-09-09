import { Contributor, CriteriaStatus } from '../../../types/scopeChangeRequest';

export function getContributorStatus(
    contributor: Contributor,
    currentStep: boolean
): CriteriaStatus {
    if (contributor.contribution) {
        return 'Approved';
    }

    if (currentStep) {
        return 'Active';
    } else {
        return 'Inactive';
    }
}
