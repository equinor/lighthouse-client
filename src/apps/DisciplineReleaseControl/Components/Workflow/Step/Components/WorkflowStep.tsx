import styled from 'styled-components';
import { useQuery } from 'react-query';
import { WorkflowCriteria } from '../../Criteria';
import { Contributor } from '../../Contributor';
import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';
import { canAddContributor } from '../../../../Api/Access';
import { WorkflowStep } from '../../../../Types/disciplineReleaseControl';

interface WorkflowStepProps {
    step: WorkflowStep;
}
export function WorkflowStepContainer({ step }: WorkflowStepProps): JSX.Element {
    const { process } = useReleaseControlContext();

    const checkContributorAccess = () =>
        canAddContributor({ processId: process.id, stepId: step.id });
    const { data: isAllowedToAddContributor } = useQuery(
        `step/${step.id}`,
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
