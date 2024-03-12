import { DetailText } from './criteria.styles';
import { useState } from 'react';
import { TooltipSidesheetContent, TooltipProps } from './TooltipSidesheetContent';

export const CriteriaItem = (props: TooltipProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setOpen = () => setIsOpen(true);
    const setClose = () => setIsOpen(false);

    return (
        <DetailText onMouseLeave={setClose} onMouseOver={setOpen}>
            {props.criteria.valueDescription}
            {isOpen && (
                <TooltipSidesheetContent
                    criteria={props.criteria}
                    stepName={props.stepName}
                ></TooltipSidesheetContent>
            )}
        </DetailText>
    );
};
