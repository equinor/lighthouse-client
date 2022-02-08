import styled from 'styled-components';

import { WorkflowCriteria } from './WorkflowCriteria';
import { Contributor } from './Contributors';
import { useScopeChangeAccessContext } from '../../Sidesheet/Context/useScopeChangeAccessContext';

export function Workflow(): JSX.Element {
    const { request } = useScopeChangeAccessContext();

    return (
        <div>
            {request.workflowSteps.map((step, index) => {
                return (
                    <WorkflowStepContainer key={index}>
                        {step.criterias &&
                            step.criterias.map((criteria) => {
                                return (
                                    <WorkflowCriteria
                                        key={criteria.id}
                                        step={step}
                                        criteria={criteria}
                                    />
                                );
                            })}
                        {step.contributors &&
                            step.contributors.map((contributor) => {
                                return (
                                    <Contributor
                                        key={contributor.id}
                                        step={step}
                                        contributor={contributor}
                                    />
                                );
                            })}
                    </WorkflowStepContainer>
                );
            })}
        </div>
    );
}

const WorkflowStepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
