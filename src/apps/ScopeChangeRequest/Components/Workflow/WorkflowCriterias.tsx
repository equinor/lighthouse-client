import { Tooltip } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Criteria, WorkflowStep } from '../../Types/scopeChangeRequest';
import { WorkflowIcon } from './WorkflowIcon';
import { WorkflowLine } from './WorkflowLine';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    lastStep: boolean;
}

export const WorkflowCriterias = ({ step, lastStep }: WorkflowCriteriasProps): JSX.Element => {
    const stepStatus = statusFunc(step);
    return (
        <>
            {step.criterias.map((criteria) => {
                const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc));

                const signedDate = date.toLocaleDateString('en-GB');
                const signedTime = `${date.getHours()}:${date.getMinutes()}`;

                return (
                    <>
                        <WorkflowStepViewContainer>
                            <Inline>
                                <WorkflowIcon
                                    status={
                                        stepStatus === 'Active'
                                            ? criteriaStatus(criteria)
                                            : stepStatus
                                    }
                                    number={step.order + 1}
                                />
                                <WorkflowText>
                                    <Tooltip
                                        title={
                                            !step.isCompleted
                                                ? `Signature from ${criteria.value} required.`
                                                : `Signed by ${criteria.signedBy.firstName} ${criteria.signedBy.lastName}`
                                        }
                                    >
                                        <span>{step.name}</span>
                                    </Tooltip>
                                    {criteria.signedAtUtc ? (
                                        <div
                                            style={{ fontSize: '14px' }}
                                        >{`${signedDate} ${signedTime} - ${criteria.signedBy.firstName} ${criteria.signedBy.lastName} `}</div>
                                    ) : (
                                        <div style={{ fontSize: '14px' }}>{criteria.value}</div>
                                    )}
                                </WorkflowText>
                            </Inline>
                            {/* {x.isCurrent && !criteria.signedState && (
                            <Button
                                variant="outlined"
                                onClick={() => onSignStep(criteria.id)}
                            >
                                Sign
                            </Button>
                        )} */}
                        </WorkflowStepViewContainer>
                        {!lastStep && (
                            <>
                                <Spacer />
                                <div style={{ padding: '1.05px' }}>
                                    <WorkflowLine colored={step.isCompleted} />
                                </div>
                                <Spacer />
                            </>
                        )}
                    </>
                );
            })}
        </>
    );
};

const statusFunc = (item: WorkflowStep): WorkflowStatus => {
    if (item.isCompleted) {
        return 'Completed';
    }
    if (item.isCurrent) {
        return 'Active';
    } else {
        return 'Inactive';
    }
};

const criteriaStatus = (criteria: Criteria): WorkflowStatus => {
    if (criteria.signedAtUtc === null) {
        return 'Active';
    } else {
        return 'Completed';
    }
};

type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Spacer = styled.div`
    height: 9px;
    width: 7px;
`;

const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    width: -webkit-fill-available;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
`;

const convertUtcToLocalDate = (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
