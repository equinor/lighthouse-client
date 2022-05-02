import { WorkflowStepContainer } from '../Step';
import { useScopeChangeContext } from '../../../Hooks/context/useScopeChangeContext';

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
