import styled from 'styled-components';
import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../Utils/dateFormatting';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { Criteria, WorkflowStep } from '../../../../Types/disciplineReleaseControl';
import { WorkflowStatus } from '../../../../../ScopeChangeRequest/Types/scopeChangeRequest';

interface CriteriaDetailProps {
    criteria: Criteria;
    step: WorkflowStep;
}

export const CriteriaDetail = ({ criteria, step }: CriteriaDetailProps): JSX.Element => {
    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
    const formattedDate = dateToDateTimeFormat(date);

    const stepStatus = statusFunc(step);

    return (
        <>
            <SplitInline>
                <WorkflowIcon
                    status={stepStatus === 'Active' ? criteriaStatus(criteria) : stepStatus}
                    number={step.order + 1}
                />

                <WorkflowText>
                    <span>{step.name}</span>
                    {criteria.signedAtUtc ? (
                        <div
                            style={{ fontSize: '14px' }}
                        >{`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}</div>
                    ) : (
                        <div style={{ fontSize: '14px' }}>{criteria.valueDescription}</div>
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
    gap: 1em;
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
