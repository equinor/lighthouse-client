import { CriteriaStatus } from '../Criteria/Components/CriteriaDetail';
import { Criteria } from '../../../types/releaseControl';

export function getCriteriaStatus(criteria: Criteria, isCurrentStep: boolean): CriteriaStatus {
  if (!criteria.signedState) {
    return isCurrentStep ? 'Active' : 'Inactive';
  }
  return criteria.signedState;
}
