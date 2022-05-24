import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { DefaultWorkflowDot } from '../../Components/Workflow/Components/DefaultWorkflowDot';
import { DisputedTableIcon } from '../../Components/WorkflowIcons/DisputedTableIcon';
import { WorkflowStep } from '../../types/scopeChangeRequest';

interface WorkflowProps {
    steps: WorkflowStep[];
}
interface CriteriaWithParent {
    signedState: string | null;
    isCurrent: boolean;
    stepName: string;
}

export function WorkflowCompact({ steps }: WorkflowProps): JSX.Element {
    const compacted = steps?.reduce((acc, { name, criterias, isCurrent }) => {
        criterias.forEach(({ signedState }) =>
            acc.push({
                stepName: name,
                isCurrent: isCurrent,
                signedState: signedState,
            })
        );
        return acc;
    }, [] as CriteriaWithParent[]);

    return (
        <>
            <WorkflowStepContainer>
                {compacted?.map(({ isCurrent, signedState, stepName }, i) => (
                    <CompactWorkflowDot
                        signedState={signedState}
                        isCurrent={isCurrent}
                        stepName={stepName}
                        key={i}
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
}
const CompactWorkflowDot = ({ isCurrent, signedState, stepName }: CompactWorkflowDotProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setOpen = () => setIsOpen(true);
    const setClose = () => setIsOpen(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={anchorRef} onMouseLeave={setClose} onMouseOver={setOpen}>
            {getStatusFromCriteria(signedState, isCurrent)}
            {isOpen && <WorkflowPopover>{stepName}</WorkflowPopover>}
        </div>
    );
};

const WorkflowPopover = styled.div`
    position: absolute;
    z-index: 1;
    color: #fff;
    background-color: #121212;
    padding: 5px 5px;
    border-radius: 4px;
    margin-top: 5px;
    margin-left: 15px;
`;

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
