import { WorkflowStepContainer } from '../Step';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';

export function Workflow(): JSX.Element {
    const workflowSteps = useScopeChangeContext(({ request }) => request.workflowSteps);

    return (
        <div>
            {workflowSteps.map((step) => (
                <WorkflowStepContainer key={step.id} step={step} />
            ))}
        </div>
    );
}
