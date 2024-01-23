import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../Utils/dateFormatting';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { Criteria, ReleaseControlStep } from '../../../../types/releaseControl';
import { CriteriaSignState } from '@equinor/Workflow';

interface CriteriaDetailProps {
    criteria: Criteria;
    step: ReleaseControlStep;
}

export type CriteriaStatus = CriteriaSignState | 'Inactive' | 'Active';

function statusFunc(criteria: Criteria, step: ReleaseControlStep): CriteriaStatus {
    if (!criteria.signedState) {
        return step.isCurrent ? 'Active' : 'Inactive';
    } else {
        return criteria.signedState;
    }
}

export const CriteriaDetail = ({ criteria, step }: CriteriaDetailProps): JSX.Element => {
    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
    const formattedDate = dateToDateTimeFormat(date);

    const stepStatus = statusFunc(criteria, step);

    return (
        <SplitInline>
            <WorkflowIcon status={stepStatus} number={step.order + 1} />

            <WorkflowText>
                <span>{step.name}</span>
                {criteria.signedAtUtc ? (
                    <DetailText>
                        <div>
                            {`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}
                            {criteria.type == 'RequireProcosysFunctionalRoleSignature' &&
                                `(${criteria.valueDescription})`}
                        </div>
                        {criteria.signedComment && <q>{criteria.signedComment}</q>}
                    </DetailText>
                ) : (
                    <DetailText>{criteria.valueDescription}</DetailText>
                )}
            </WorkflowText>
        </SplitInline>
    );
};

const DetailText = styled.div`
    font-size: 14px;
`;

const SplitInline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
`;

const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;
