import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { getShortformCompletionStatusName } from '../../../Functions/statusHelpers';
import { PipetestCompletionStatusColors } from '../../../Styles/ReleaseControlColors';
import { PipetestCompletionStatus } from '../../../Types/drcEnums';
import { WorkflowDotPopover } from './WorkflowDotPopover';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Outstanding' | 'Complete' | 'Inactive' | 'PunchAError' | 'PunchBError';
    circleText: string;
    popoverText: string;
    active: boolean;
}

interface dotStyling {
    color: string;
    stroke: string;
    active: boolean;
    status: string;
    circleText: string;
    popoverText: string;
}

export const WorkflowDot = ({
    state,
    circleText,
    popoverText,
    active,
}: WorkflowDotProps): JSX.Element => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const dotProps: dotStyling = useMemo(() => {
        switch (state) {
            case PipetestCompletionStatus.Outstanding:
                return {
                    color: PipetestCompletionStatusColors.OS,
                    stroke: PipetestCompletionStatusColors.OS,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };

            case PipetestCompletionStatus.Complete:
                return {
                    color: PipetestCompletionStatusColors.OK,
                    stroke: PipetestCompletionStatusColors.OK,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            case PipetestCompletionStatus.Inactive:
                return {
                    color: PipetestCompletionStatusColors.INACTIVE,
                    stroke: PipetestCompletionStatusColors.INACTIVE,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            case PipetestCompletionStatus.PunchAError:
                return {
                    color: PipetestCompletionStatusColors.PA,
                    stroke: PipetestCompletionStatusColors.PA,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            case PipetestCompletionStatus.PunchBError:
                return {
                    color: PipetestCompletionStatusColors.PB,
                    stroke: PipetestCompletionStatusColors.PB,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            default:
                return {
                    color: PipetestCompletionStatusColors.OS,
                    stroke: PipetestCompletionStatusColors.OS,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
        }
    }, [active, state, circleText, popoverText]);

    return (
        <StepCircle
            ref={anchorRef}
            onMouseOver={onOpen}
            onMouseLeave={onClose}
            color={dotProps.color}
            active={dotProps.active}
            status={dotProps.status}
        >
            {circleText}
            {isOpen && (
                <WorkflowDotPopover>
                    {popoverText}, {getShortformCompletionStatusName(state)}
                </WorkflowDotPopover>
            )}
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
    cursor: pointer;
`;
