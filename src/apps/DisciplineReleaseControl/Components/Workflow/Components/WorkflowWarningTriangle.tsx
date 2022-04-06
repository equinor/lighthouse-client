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
    margin-bottom: 2px;
    font-size: 11px;
    color: '#fff';
    line-height: 18px;
    text-align: center;
    cursor: pointer;
`;

export const WarningTriangleOutline = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
    border-width: 0 8px 16px 8px;
`;

export const WarningTriangleInner = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    position: relative;
    border-width: 0 6px 12px 6px;
    border-color: transparent transparent #eb0000 transparent;
    right: 6px;
    top: 3px;
`;

export const WarningTriangleNoOutline = styled.div`
    margin-top: 2px;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent #eb0000 transparent;
    border-width: 0 8px 16px 8px;
`;
