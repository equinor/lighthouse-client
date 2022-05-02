import { useRef, useState } from 'react';
import { WarningTriangleContainer } from '../Styles/styles';
import { WorkflowPopover } from './WorkflowPopover';

interface WorkflowDotProps {
    popoverText?: string;
    color: string;
}

export const WorkflowWarningTriangle = ({ popoverText, color }: WorkflowDotProps): JSX.Element => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <WarningTriangleContainer ref={anchorRef} onMouseOver={onOpen} onMouseLeave={onClose}>
            <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0L0 14H16L8 0ZM8 2.01556L1.72318 13H14.2768L8 2.01556Z"
                    fill={color}
                />
            </svg>
            {isOpen && popoverText !== undefined && (
                <WorkflowPopover>{popoverText}</WorkflowPopover>
            )}
        </WarningTriangleContainer>
    );
};
