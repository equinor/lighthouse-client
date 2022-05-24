import { Contributor } from '../../../types/releaseControl';
import { CriteriaStatus } from '../Criteria/Components/CriteriaDetail';

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
