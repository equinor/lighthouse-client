import { WorkflowStepContainer } from '../Step';
import { useReleaseControlContext } from '../../Sidesheet/Context/useReleaseControlAccessContext';

export function Workflow(): JSX.Element {
    const { process } = useReleaseControlContext();

    return (
        <div>
            {process.workflowSteps.map((step) => (
                <WorkflowStepContainer key={step.id} step={step} />
            ))}
        </div>
    );
}
