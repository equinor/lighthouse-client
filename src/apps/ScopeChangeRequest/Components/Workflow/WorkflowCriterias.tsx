import { Tooltip } from '@equinor/eds-core-react';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { Criteria, WorkflowStep } from '../../Types/scopeChangeRequest';
import { WorkflowIcon } from './WorkflowIcon';
import { convertUtcToLocalDate } from './Utils/utcDateToLocal';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
}

export const WorkflowCriterias = ({ step }: WorkflowCriteriasProps): JSX.Element => {
    const stepStatus = statusFunc(step);

    return (
        <>
            {step.criterias.map((criteria) => {
                const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc));
                const { day, month, year, hour, minute } = DateTime.fromJSDate(date).toObject();
                const paddedMinutes = minute.toString().length === 1 ? `0${minute}` : minute;
                return (
                    <WorkflowStepViewContainer key={criteria.id}>
                        <SplitInline>
                            <WorkflowIcon
                                status={
                                    stepStatus === 'Active' ? criteriaStatus(criteria) : stepStatus
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
                        </SplitInline>
                    </WorkflowStepViewContainer>
                );
            })}
        </>
    );
};

const SplitInline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const statusFunc = (item: WorkflowStep): WorkflowStatus => {
    if (item.isCompleted) {
        return 'Completed';
    } else if (item.isCurrent) {
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
