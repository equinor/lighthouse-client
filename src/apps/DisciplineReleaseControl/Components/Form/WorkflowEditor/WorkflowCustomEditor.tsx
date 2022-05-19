import styled from 'styled-components';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { WorkflowStep } from './WorkflowStep';

export const WorkflowCustomEditor = (): JSX.Element => {
    const { useAtomState } = DRCFormAtomApi;

    const { steps = [] } = useAtomState(({ steps }) => ({
        steps,
    }));

    return (
        <WorkflowWrapper>
            {steps?.map((step) => (
                <WorkflowStep key={step.order} step={step} steps={steps} />
            ))}
        </WorkflowWrapper>
    );
};

const WorkflowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export interface ReleaseControlStep {
    order: number;
    step: string;
    responsible: string;
}
