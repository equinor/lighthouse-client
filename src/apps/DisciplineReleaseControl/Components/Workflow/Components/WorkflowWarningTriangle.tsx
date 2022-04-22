import { useRef, useState } from 'react';
import styled from 'styled-components';
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

export const WarningTriangleContainer = styled.div`
    margin-left: 5px;
    font-size: 11px;
    color: '#fff';
    line-height: 14px;
    text-align: center;
    cursor: pointer;
`;

export const WarningTriangleOutline = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
    border-width: 0 6px 12px 6px;
`;

export const WarningTriangleInner = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    position: relative;
    border-width: 0 4.5px 9px 4.5px;
    border-color: transparent transparent #eb0000 transparent;
    right: 4.5px;
    top: 2.5px;
`;

export const WarningTriangleNoOutline = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent #eb0000 transparent;
    border-width: 0 6px 12px 6px;
    margin-right: 8px;
    padding-top: 4px;
`;

export const CurrentStepContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
