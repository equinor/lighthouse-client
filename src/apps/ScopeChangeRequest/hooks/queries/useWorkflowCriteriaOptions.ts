import { useQuery } from 'react-query';
import { scopeChangeQueries } from '../../keys/queries';

interface CriteriaOptions {
    canSign: boolean | undefined;
    canUnsign: boolean | undefined;
    canReassign: boolean | undefined;
}

export function useWorkflowCriteriaOptions(
    requestId: string,
    criteriaId: string,
    stepId: string
): CriteriaOptions {
    const { canSignQuery, canUnsignQuery, canReassignQuery } = scopeChangeQueries.workflowQueries;

    const { data: userCanReassign } = useQuery(canReassignQuery([requestId, stepId, criteriaId]));
    const { data: userCanUnsign } = useQuery(canUnsignQuery([requestId, stepId, criteriaId]));
    const { data: userCanSign } = useQuery(canSignQuery([requestId, stepId, criteriaId]));

    return {
        canSign: userCanSign,
        canReassign: userCanReassign,
        canUnsign: userCanUnsign,
    };
}
