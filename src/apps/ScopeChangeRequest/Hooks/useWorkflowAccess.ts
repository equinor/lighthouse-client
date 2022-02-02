import { useEffect, useState } from 'react';
import { canSign } from '../Api/ScopeChange/Access/canSign';

interface WorkflowAccess {
    signableCriterias: Criteria[] | undefined;
    contributionId: string | undefined;
}

interface Criteria {
    id: string;
    signedState: 'Approved' | 'Rejected' | null;
    value: string;
}

interface Contributor {
    id: string;
    contribution: unknown | null;
}

export function useWorkflowAccess(
    id: string,
    criterias: Criteria[] | undefined,
    contributors: Contributor[] | undefined,
    stepId: string | undefined,
    checkContributors: (
        contributors: Contributor[],
        requestId: string,
        stepId: string
    ) => string | undefined
): WorkflowAccess {
    const [signableCriterias, setSignableCriterias] = useState<Criteria[] | undefined>(undefined);
    const [contributionId, setContributionId] = useState<string | undefined>(undefined);

    useEffect(() => {
        setContributionId(undefined);
        setSignableCriterias(undefined);

        if (id && stepId) {
            if (criterias && criterias.length > 0) {
                const unfulfilledCriterias = criterias.filter((x) => x.signedState === null);
                const verified = unfulfilledCriterias.filter(
                    async (x) => x.signedState === null && (await canSign(id, stepId, x.id))
                );

                if (verified.length > 0) {
                    setSignableCriterias(verified);
                }
            }
            if (contributors && contributors.length > 0) {
                setContributionId(checkContributors(contributors, id, stepId));
            }
        }
    }, [id, JSON.stringify(criterias), JSON.stringify(contributors), stepId, checkContributors]);

    return {
        signableCriterias: signableCriterias,
        contributionId: contributionId,
    };
}
