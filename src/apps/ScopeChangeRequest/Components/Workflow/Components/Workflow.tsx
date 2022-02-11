
import { WorkflowStepContainer } from '../Step'
import { useScopeChangeContext } from '../../Sidesheet/Context/useScopeChangeAccessContext';

export function Workflow(): JSX.Element {
    const { request } = useScopeChangeContext();

    return (
        <div>
            {request.workflowSteps.map((step) => <WorkflowStepContainer key={step.id} step={step} />
            )}
        </div>
    );
}

