import { WorkflowStepContainer } from '../Step';
import { useScopeChangeContext } from '../../../Hooks/context/useScopeChangeAccessContext';

export function Workflow(): JSX.Element {
    const workflowSteps = useScopeChangeContext({ select: (s) => s.request.workflowSteps });

    return (
        <div>
            {workflowSteps.map((step) => (
                <WorkflowStepContainer key={step.id} step={step} />
            ))}
        </div>
    );
}
