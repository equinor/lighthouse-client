import styled from 'styled-components';
import { Criteria, WorkflowStatus, WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../Utils/dateFormatting';
import { WorkflowIcon } from '../../Components/WorkflowIcon';

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
                <FixedIconContainer>
                    <WorkflowIcon
                        status={stepStatus === 'Active' ? criteriaStatus(criteria) : stepStatus}
                        number={step.order + 1}
                    />
                </FixedIconContainer>

                <WorkflowText>
                    <span>{step.name}</span>
                    {criteria.signedAtUtc ? (
                        <>
                            <div
                                style={{ fontSize: '14px' }}
                            >{`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}</div>
                            {criteria.signedComment && (
                                <q style={{ fontSize: '14px' }}>{criteria.signedComment}</q>
                            )}
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '14px' }}>{criteria.valueDescription}</div>
                        </>
                    )}
                </WorkflowText>
            </SplitInline>
        </>
    );
};

const FixedIconContainer = styled.div`
    width: 29px;
    height: 29px;
`;

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
