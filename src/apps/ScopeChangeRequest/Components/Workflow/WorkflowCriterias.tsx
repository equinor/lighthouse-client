import { Tooltip } from '@equinor/eds-core-react';
import { DateTime } from 'luxon';
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
                const { day, month, year, hour, minute } = DateTime.fromJSDate(date).toObject();
                const paddedMinutes = minute.toString().length === 1 ? `0${minute}` : minute;
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
                                <Divider />
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
                                        >{`${day}/${month}/${year} ${hour}:${paddedMinutes} - ${criteria.signedBy.firstName} ${criteria.signedBy.lastName} `}</div>
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
                                {/* <Spacer />
                                <div style={{ padding: '1.05px' }}>
                                    <WorkflowLine colored={step.isCompleted} />
                                </div>
                                <Spacer /> */}
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

const Divider = styled.div`
    height: 9px;
    width: 0.5rem;
`;

const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    width: -webkit-fill-available;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
`;

const convertUtcToLocalDate = (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
