import { CriteriaStatus } from '../Criteria/Components/CriteriaDetail';
import { Contributor } from '../../../types/scopeChangeRequest';

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
