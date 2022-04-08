import styled from 'styled-components';

interface WorkflowFilterDotProps {
    color: string;
    circleText: string;
}

export const WorkflowFilterDot = ({ color, circleText }: WorkflowFilterDotProps): JSX.Element => {
    return <StepCircle color={color}>{circleText}</StepCircle>;
};

type StepCircleProps = {
    color: string;
};

export const StepCircle = styled.div<StepCircleProps>`
    width: 14px;
    height: 14px;
    border-radius: 16px;
    font-size: 11px;
    color: #000;
    line-height: 16px;
    text-align: center;
    background: ${(p) => p.color};
    margin-right: 5px;
`;

export const StepFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const StepFilterText = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;
