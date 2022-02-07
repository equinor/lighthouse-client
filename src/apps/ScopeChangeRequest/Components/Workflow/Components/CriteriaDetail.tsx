import { DateTime } from 'luxon';
import styled from 'styled-components';
import { Criteria, WorkflowStatus, WorkflowStep } from '../../../Types/scopeChangeRequest';
import { convertUtcToLocalDate } from '../Utils/utcDateToLocal';
import { WorkflowIcon } from './WorkflowIcon';

interface CriteriaDetailProps {
    criteria: Criteria;
    step: WorkflowStep;
}

export const CriteriaDetail = ({ criteria, step }: CriteriaDetailProps): JSX.Element => {
    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc));
    const { day, month, year, hour, minute } = DateTime.fromJSDate(date).toObject();
    const paddedMinutes = minute.toString().length === 1 ? `0${minute}` : minute;

    const stepStatus = statusFunc(step);

    return (
        <>
            <SplitInline>
                <WorkflowIcon
                    status={stepStatus === 'Active' ? criteriaStatus(criteria) : stepStatus}
                    number={step.order + 1}
                />
                <Divider />
                <WorkflowText>
                    <span>{step.name}</span>
                    {criteria.signedAtUtc ? (
                        <div
                            style={{ fontSize: '14px' }}
                        >{`${day}/${month}/${year} ${hour}:${paddedMinutes} - ${criteria.signedBy.firstName} ${criteria.signedBy.lastName} `}</div>
                    ) : (
                        <div style={{ fontSize: '14px' }}>{criteria.value}</div>
                    )}
                </WorkflowText>
            </SplitInline>
        </>
    );
};
const SplitInline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const criteriaStatus = (criteria: Criteria): WorkflowStatus => {
    if (criteria.signedAtUtc === null) {
        return 'Active';
    } else {
        return 'Completed';
    }
};
const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

const Divider = styled.div`
    height: 9px;
    width: 0.5rem;
`;
