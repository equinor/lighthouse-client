import { useState } from 'react';
import {
    CircuitDiagramPopover,
    CriticalLineVisualStyle,
    TestDotCircleText,
    TestDotWrapper,
} from '../../styles/styles';

export const CriticalLineVisual = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <>
            <TestDotWrapper onMouseOver={onOpen} onMouseLeave={onClose}>
                <CriticalLineVisualStyle>
                    <TestDotCircleText>CL</TestDotCircleText>
                    {isOpen && (
                        <div>
                            <CircuitDiagramPopover>{'Heating Critical Line'}</CircuitDiagramPopover>
                        </div>
                    )}
                </CriticalLineVisualStyle>
            </TestDotWrapper>
        </>
    );
};
