import { useQuery } from 'react-query';
import { canReassign, canUnsign, canSign } from '../Api/ScopeChange/Access';

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
    const params = {
        criteriaId,
        requestId,
        stepId,
    };

    const checkCanSign = () => canSign(params);
    const { data: userCanSign } = useQuery(`step/${stepId}/criteria/${criteriaId}`, checkCanSign, {
        refetchOnWindowFocus: false,
    });
    const checkCanReassign = () => canReassign(params);
    const { data: userCanReassign } = useQuery(
        `step/${stepId}/criteria/${criteriaId}`,
        checkCanReassign,
        { refetchOnWindowFocus: false }
    );
    const checkCanUnsign = () => canUnsign(params);
    const { data: userCanUnsign } = useQuery(
        `step/${stepId}/criteria/${criteriaId}`,
        checkCanUnsign,
        { refetchOnWindowFocus: false }
    );

    return {
        canSign: userCanSign,
        canReassign: userCanReassign,
        canUnsign: userCanUnsign,
    };
}
