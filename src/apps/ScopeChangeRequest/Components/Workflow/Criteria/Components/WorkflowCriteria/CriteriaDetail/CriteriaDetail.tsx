import {
    Criteria,
    CriteriaSignState,
    WorkflowStep,
} from '../../../../../../types/scopeChangeRequest';
import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../../../Utils/dateFormatting';
import { WorkflowIcon } from '../../../../Components/WorkflowIcon';
import { DetailText, SplitInline, WorkflowText } from './criteriaDetail.styles';
import { getCriteriaStatus } from './Utils/getCriteriaStatus';

interface CriteriaDetailProps {
    criteria: Criteria;
    step: WorkflowStep;
}

export type CriteriaStatus = CriteriaSignState | 'Inactive' | 'Active';

export const CriteriaDetail = ({ criteria, step }: CriteriaDetailProps): JSX.Element => {
    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
    const formattedDate = dateToDateTimeFormat(date);

    const stepStatus = getCriteriaStatus(criteria, step);

    return (
        <SplitInline>
            <WorkflowIcon status={stepStatus} number={step.order + 1} />

            <WorkflowText>
                <span>{step.name}</span>
                {criteria.signedAtUtc ? (
                    <DetailText>
                        <div>{`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}</div>
                        {criteria.signedComment && <q>{criteria.signedComment}</q>}
                    </DetailText>
                ) : (
                    <DetailText>{criteria.valueDescription}</DetailText>
                )}
            </WorkflowText>
        </SplitInline>
    );
};
