import { tokens } from '@equinor/eds-tokens';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { getShortformCompletionStatusName } from '../../../Functions/statusHelpers';
import {
    PipetestCompletionStatusColors,
    PipetestCompletionStatusHoverColors,
} from '../../../Styles/ReleaseControlColors';
import { PipetestCompletionStatus } from '../../../Types/drcEnums';
import { WorkflowDotUnderLine } from './WorkflowDotUnderline';
import { WorkflowPopover } from './WorkflowPopover';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Outstanding' | 'Complete' | 'Inactive' | 'PunchAError' | 'PunchBError';
    circleText: string;
    popoverText: string;
    active: boolean;
    isPopoverDisabled?: boolean;
    underline?: 'Before' | 'Underline' | 'After' | '';
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
    height,
    width,
    state,
    circleText,
    popoverText,
    active,
    isPopoverDisabled,
    underline,
}: WorkflowDotProps): JSX.Element => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const dotProps: dotStyling = useMemo(() => {
        switch (state) {
            case PipetestCompletionStatus.Outstanding:
                return {
                    color: isOpen
                        ? PipetestCompletionStatusHoverColors.OS
                        : PipetestCompletionStatusColors.OS,
                    stroke: PipetestCompletionStatusColors.OS,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };

            case PipetestCompletionStatus.Complete:
                return {
                    color: isOpen
                        ? PipetestCompletionStatusHoverColors.OK
                        : PipetestCompletionStatusColors.OK,
                    stroke: PipetestCompletionStatusColors.OK,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            case PipetestCompletionStatus.Inactive:
                return {
                    color: isOpen
                        ? PipetestCompletionStatusHoverColors.INACTIVE
                        : PipetestCompletionStatusColors.INACTIVE,
                    stroke: PipetestCompletionStatusColors.INACTIVE,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            case PipetestCompletionStatus.PunchAError:
                return {
                    color: isOpen
                        ? PipetestCompletionStatusHoverColors.PA
                        : PipetestCompletionStatusColors.PA,
                    stroke: PipetestCompletionStatusColors.PA,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            case PipetestCompletionStatus.PunchBError:
                return {
                    color: isOpen
                        ? PipetestCompletionStatusHoverColors.PB
                        : PipetestCompletionStatusColors.PB,
                    stroke: PipetestCompletionStatusColors.PB,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
            default:
                return {
                    color: isOpen
                        ? PipetestCompletionStatusHoverColors.OS
                        : PipetestCompletionStatusColors.OS,
                    stroke: PipetestCompletionStatusColors.OS,
                    circleText: circleText,
                    active: active,
                    status: state,
                    popoverText: popoverText,
                };
        }
    }, [active, state, circleText, popoverText, isOpen]);
    return (
        <StepCircleWrapper>
            <StepCircle
                ref={anchorRef}
                onMouseOver={onOpen}
                onMouseLeave={onClose}
                color={dotProps.color}
                active={dotProps.active}
                status={dotProps.status}
                height={height}
                width={width}
            >
                {circleText}
                {isOpen && !isPopoverDisabled && (
                    <WorkflowPopover>
                        {popoverText}, {!active ? 'N/A' : getShortformCompletionStatusName(state)}
                    </WorkflowPopover>
                )}
            </StepCircle>
            {underline !== undefined && underline !== '' && (
                <UnderlineWrapper position={underline ?? ''}>
                    <WorkflowDotUnderLine />
                </UnderlineWrapper>
            )}
        </StepCircleWrapper>
    );
};

type StepCircleProps = {
    color: string;
    active: boolean;
    status: string;
    height?: number;
    width?: number;
};

export const StepCircleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UnderlineWrapper = styled.div<{ position: string }>`
    display: flex;
    position: relative;
    left: ${(p) => (p.position === 'Underline' ? '3.5px' : p.position === 'After' ? '12px' : null)};
    right: ${(p) => (p.position === 'Before' ? '5.5px' : null)};
    margin-top: 2px;
`;

export const StepCircle = styled.div<StepCircleProps>`
    height: ${(p) => (p.height ? p.height + 'px' : '16px')};
    width: ${(p) => (p.width ? p.width + 'px' : '16px')};
    border-radius: 17px;
    font-size: 11px;
    color: ${(p) =>
        p.status === PipetestCompletionStatus.Complete ||
        p.status === PipetestCompletionStatus.PunchAError
            ? `${tokens.colors.text.static_icons__primary_white.hex}`
            : p.status === PipetestCompletionStatus.Inactive
            ? `${tokens.colors.ui.background__medium.hex}`
            : `${tokens.colors.text.static_icons__default.hex}`};
    line-height: ${(p) => (p.height ? p.height + 2 + 'px' : '18px')};
    text-align: center;
    background: ${(p) => p.color};
    outline: ${(p) => (!p.active ? `1px dashed ${tokens.colors.ui.background__medium.hex}` : null)};
    cursor: ${(p) => (!p.active ? 'not-allowed' : 'pointer')};
`;
