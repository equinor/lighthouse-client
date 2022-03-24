import { useMemo } from 'react';
import styled from 'styled-components';
import { PipetestCompletionStatusColors } from '../../../Styles/ReleaseControlColors';
import { PipetestCompletionStatus } from '../../../Types/drcEnums';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Outstanding' | 'Complete' | 'Inactive' | 'PunchAError' | 'PunchBError';
    text?: string;
    active: boolean;
}

interface dotStyling {
    color: string;
    stroke: string;
    active: boolean;
    status: string;
}

export const WorkflowDot = ({ state, text, active }: WorkflowDotProps): JSX.Element => {
    const dotProps: dotStyling = useMemo(() => {
        switch (state) {
            case PipetestCompletionStatus.Outstanding:
                return {
                    color: PipetestCompletionStatusColors.OS,
                    stroke: PipetestCompletionStatusColors.OS,
                    text: text,
                    active: active,
                    status: state,
                };

            case PipetestCompletionStatus.Complete:
                return {
                    color: PipetestCompletionStatusColors.OK,
                    stroke: PipetestCompletionStatusColors.OK,
                    text: text,
                    active: active,
                    status: state,
                };
            case PipetestCompletionStatus.Inactive:
                return {
                    color: PipetestCompletionStatusColors.INACTIVE,
                    stroke: PipetestCompletionStatusColors.INACTIVE,
                    text: text,
                    active: active,
                    status: state,
                };
            case PipetestCompletionStatus.PunchAError:
                return {
                    color: PipetestCompletionStatusColors.PA,
                    stroke: PipetestCompletionStatusColors.PA,
                    text: text,
                    active: active,
                    status: state,
                };
            case PipetestCompletionStatus.PunchBError:
                return {
                    color: PipetestCompletionStatusColors.PB,
                    stroke: PipetestCompletionStatusColors.PB,
                    text: text,
                    active: active,
                    status: state,
                };
        }
    }, [active, state, text]);

    return (
        <StepCircle color={dotProps.color} active={dotProps.active} status={dotProps.status}>
            {text}
        </StepCircle>
    );
};

type StepCircleProps = {
    color: string;
    active: boolean;
    status: string;
};

export const StepCircle = styled.div<StepCircleProps>`
    width: 16px;
    height: 16px;
    border-radius: 17px;
    font-size: 11px;
    color: ${(p) =>
        p.status === PipetestCompletionStatus.Complete ||
        p.status === PipetestCompletionStatus.PunchAError
            ? '#fff'
            : p.status === PipetestCompletionStatus.Inactive
            ? '#DCDCDC'
            : '#000'};
    line-height: 18px;
    text-align: center;
    background: ${(p) => p.color};
    outline: ${(p) => (!p.active ? '1px dashed #DCDCDC' : null)};
`;
