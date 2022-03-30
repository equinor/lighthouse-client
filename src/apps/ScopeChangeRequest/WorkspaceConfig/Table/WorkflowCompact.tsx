import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Fragment } from 'react';
import styled from 'styled-components';
import { DefaultWorkflowDot } from '../../Components/Workflow/Components/DefaultWorkflowDot';
import { WorkflowStep } from '../../Types/scopeChangeRequest';

interface WorkflowProps {
    steps: WorkflowStep[];
}
interface CriteriaWithParent {
    signedState: string | null;
    isCurrent: boolean;
}

export function WorkflowCompact({ steps }: WorkflowProps): JSX.Element {
    const compacted = steps.reduce((acc, { criterias, isCurrent }) => {
        criterias.forEach(({ signedState }) =>
            acc.push({
                isCurrent: isCurrent,
                signedState: signedState,
            })
        );
        return acc;
    }, [] as CriteriaWithParent[]);

    return (
        <>
            <WorkflowStepContainer>
                {compacted.map(({ isCurrent, signedState }, i) => (
                    <Fragment key={i}>{getStatusFromCriteria(signedState, isCurrent)}</Fragment>
                ))}
            </WorkflowStepContainer>
        </>
    );
}

function getStatusFromCriteria(signedState: string | null, isCurrent: boolean): JSX.Element {
    switch (true) {
        case signedState === 'Approved': {
            return (
                <Icon
                    name="check_circle_outlined"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            );
        }

        case signedState === 'Rejected': {
            return (
                <Icon
                    name="close_circle_outlined"
                    color={tokens.colors.interactive.danger__resting.hex}
                />
            );
        }

        case isCurrent: {
            return (
                <DefaultWorkflowDot
                    stroke={tokens.colors.interactive.primary__resting.hex}
                    fill={tokens.colors.interactive.primary__resting.hex}
                />
            );
        }

        default: {
            return <DefaultWorkflowDot />;
        }
    }
}

export const WorkflowStepContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.1em;
`;
