import styled from 'styled-components';

export const WorkflowContainer = styled.div`
    display: flex;
    flex-direction: ${(props: WorkflowStepProps) => props.direction};
`;

interface WorkflowStepProps {
    direction: 'row' | 'column';
}
