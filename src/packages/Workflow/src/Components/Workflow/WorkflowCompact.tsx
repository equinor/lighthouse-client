import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { WorkflowStep } from '../../Types/WorkflowTypes';
import { DisputedTableIcon } from '../WorkflowIcons/DisputedTableIcon';
import { DefaultWorkflowDot } from './DefaultWorkflowDot';
import { Criteria } from '../../../../../apps/ReleaseControl/types/releaseControl';
import { TooltipSidesheetContent } from '../../../../../apps/ReleaseControl/components/Workflow/Criteria/Components/TooltipSidesheetContent';
import { TooltipTableContent } from '../../../../../apps/ReleaseControl/components/Workflow/Criteria/Components/TooltipTableContent';

interface WorkflowProps {
    steps: WorkflowStep[];
}
interface CriteriaWithParent {
    signedState: string | null;
    isCurrent: boolean;
    stepName: string;
    criteria: Criteria[];
}

export function WorkflowCompact({ steps }: WorkflowProps): JSX.Element {
    const compacted = steps?.reduce((acc, { name, criterias, isCurrent }) => {
        criterias.forEach(({ signedState }) =>
            acc.push({
                stepName: name,
                isCurrent: isCurrent,
                signedState: signedState,
                criteria: criterias,
            })
        );
        return acc;
    }, [] as CriteriaWithParent[]);

    return (
        <>
            <WorkflowStepContainer>
                {compacted.map(({ isCurrent, signedState, stepName, criteria }, i) => (
                    <CompactWorkflowDot
                        signedState={signedState}
                        isCurrent={isCurrent}
                        stepName={stepName}
                        key={i}
                        criteria={criteria}
                    />
                ))}
            </WorkflowStepContainer>
        </>
    );
}

interface CompactWorkflowDotProps {
    signedState: string | null;
    isCurrent: boolean;
    stepName: string;
    criteria: Criteria[];
}
const CompactWorkflowDot = ({
    isCurrent,
    signedState,
    stepName,
    criteria,
}: CompactWorkflowDotProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setOpen = () => setIsOpen(true);
    const setClose = () => setIsOpen(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={anchorRef} onMouseLeave={setClose} onMouseOver={setOpen}>
            {getStatusFromCriteria(signedState, isCurrent)}

            {isOpen && <TooltipTableContent criteria={criteria[0]} stepName={stepName} />}
        </div>
    );
};

function getStatusFromCriteria(signedState: string | null, isCurrent: boolean): JSX.Element {
    switch (true) {
        case signedState === 'Approved': {
            return (
                <Icon
                    width={14.4}
                    height={14.4}
                    name="check_circle_outlined"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            );
        }

        case signedState === 'Rejected': {
            return (
                <Icon
                    width={14.4}
                    height={14.4}
                    name="close_circle_outlined"
                    color={tokens.colors.interactive.danger__resting.hex}
                />
            );
        }

        case signedState === 'Disputed': {
            return <DisputedTableIcon />;
        }

        case isCurrent: {
            return (
                <DefaultWorkflowDot
                    width={14.4}
                    height={14.4}
                    stroke={tokens.colors.interactive.primary__resting.hex}
                    fill={tokens.colors.interactive.primary__resting.hex}
                />
            );
        }

        default: {
            return <DefaultWorkflowDot height={14.4} width={14.4} />;
        }
    }
}

export const WorkflowStepContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.1em;
`;
