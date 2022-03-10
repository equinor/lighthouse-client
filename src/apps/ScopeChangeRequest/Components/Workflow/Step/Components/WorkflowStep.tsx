import styled from 'styled-components';
import { WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { canAddContributor } from '../../../../Api/ScopeChange/Access/Workflow/Step/canManageContributors';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { WorkflowCriteria } from '../../Criteria';
import { Contributor } from '../../Contributor';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { useScopechangeQueryKeyGen } from '../../../../Hooks/React-Query/useScopechangeQueryKeyGen';
import { useScopeChangeQuery } from '../../../../Hooks/React-Query/useScopeChangeQuery';

interface WorkflowStepProps {
    step: WorkflowStep;
}
export function WorkflowStepContainer({ step }: WorkflowStepProps): JSX.Element {
    const { request } = useScopeChangeContext();
    const { workflowKeys } = useScopechangeQueryKeyGen(request.id);

    const checkContributorAccess = () =>
        canAddContributor({ requestId: request.id, stepId: step.id });
    const { data: isAllowedToAddContributor } = useScopeChangeQuery(
        workflowKeys.canAddContributorKey(step.id),
        checkContributorAccess,
        'Failed to get permissions',
        {
            refetchOnWindowFocus: false,
            staleTime: CacheTime.FiveMinutes,
            cacheTime: CacheTime.FiveMinutes,
        }
    );

    return (
        <WorkflowStepWrapper key={step.id}>
            {step.criterias &&
                step.criterias.map((criteria) => {
                    return (
                        <WorkflowCriteria
                            key={criteria.id}
                            step={step}
                            criteria={criteria}
                            canAddContributor={isAllowedToAddContributor ?? false}
                        />
                    );
                })}
            {step.contributors &&
                step.contributors.map((contributor) => {
                    return (
                        <Contributor key={contributor.id} step={step} contributor={contributor} />
                    );
                })}
        </WorkflowStepWrapper>
    );
}

const WorkflowStepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
