import { useRef, useState } from 'react';
import {
    WarningTriangleContainer,
    WarningTriangleInner,
    WarningTriangleNoOutline,
    WarningTriangleOutline,
} from '../Styles/styles';
import { WorkflowPopover } from './WorkflowPopover';

interface WorkflowDotProps {
    circleText?: string;
    popoverText?: string;
    outline?: boolean;
}

export const WorkflowWarningTriangle = ({
    circleText,
    popoverText,
    outline,
}: WorkflowDotProps): JSX.Element => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return outline ? (
        <WarningTriangleContainer>
            <WarningTriangleOutline>
                <WarningTriangleInner ref={anchorRef} onMouseOver={onOpen} onMouseLeave={onClose}>
                    {circleText}
                    {isOpen && popoverText !== undefined && (
                        <WorkflowPopover>{popoverText}</WorkflowPopover>
                    )}
                </WarningTriangleInner>
            </WarningTriangleOutline>
        </WarningTriangleContainer>
    ) : (
        <WarningTriangleContainer>
            <WarningTriangleNoOutline ref={anchorRef} onMouseOver={onOpen} onMouseLeave={onClose}>
                {circleText}
                {isOpen && popoverText !== undefined && (
                    <WorkflowPopover>{popoverText}</WorkflowPopover>
                )}
            </WarningTriangleNoOutline>
        </WarningTriangleContainer>
    );
};
