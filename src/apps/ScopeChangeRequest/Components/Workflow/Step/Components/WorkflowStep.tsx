import styled from 'styled-components';
import { WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { canAddContributor } from '../../../../Api/ScopeChange/Access/Workflow/Step/canManageContributors';
import { useQuery } from 'react-query';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { WorkflowCriteria } from '../../Criteria';
import { Contributor } from '../../Contributor';

interface WorkflowStepProps {
    step: WorkflowStep;
}
export function WorkflowStepContainer({ step }: WorkflowStepProps): JSX.Element {
    const { request } = useScopeChangeContext();

    const checkContributorAccess = () =>
        canAddContributor({ requestId: request.id, stepId: step.id });
    const { data: isAllowedToAddContributor } = useQuery(
        ['step', step.id],
        checkContributorAccess,
        { refetchOnWindowFocus: false }
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
