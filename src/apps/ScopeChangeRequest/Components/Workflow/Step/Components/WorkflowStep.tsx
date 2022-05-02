import styled from 'styled-components';
import { WorkflowStep } from '../../../../types/scopeChangeRequest';
import { useScopeChangeContext } from '../../../../Hooks/context/useScopeChangeContext';
import { WorkflowCriteria } from '../../Criteria';
import { Contributor } from '../../Contributor';
import { useQuery } from 'react-query';
import { scopeChangeQueries } from '../../../../keys/queries';

interface WorkflowStepProps {
    step: WorkflowStep;
}
export function WorkflowStepContainer({ step }: WorkflowStepProps): JSX.Element {
    const requestId = useScopeChangeContext((s) => s.request.id);

    const { canAddContributorQuery } = scopeChangeQueries.workflowQueries;

    const { data: isAllowedToAddContributor } = useQuery(
        canAddContributorQuery(requestId, step.id)
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
            {step.isCurrent &&
                step.contributors &&
                step.contributors.map((contributor) => {
                    return (
                        <Contributor
                            key={contributor.id}
                            step={step}
                            contributor={contributor}
                            canRemoveContributor={isAllowedToAddContributor ?? false}
                        />
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
