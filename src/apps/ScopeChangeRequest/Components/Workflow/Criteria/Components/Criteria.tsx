import { useState } from 'react';
import { useAtom } from '@dbeining/react-atom';

import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { AddContributor } from './AddContributor';
import { CriteriaStatus } from './CriteriaDetail';
import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../Utils/dateFormatting';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { Contributor, Criteria } from '../../../../types/scopeChangeRequest';
import { actionWithCommentAtom } from '../../Atoms/signingAtom';
import { ContributorRender } from '../../Contributor/Contributor';
import { RowContent, WorkflowRow, WorkflowWrapper } from '../../workflowLayout.styles';
import { CriteriaActionBar } from './CriteriaActionBar';
import { CriteriaActionOverlay } from './CriteriaActionOverlay';
import { DetailText, VerticalLine, WorklowIconAndLine } from './criteria.styles';

interface CriteriaRenderProps {
    name: string;
    criteria: Criteria;
    contributors: Contributor[];
    stepIndex: number;
    stepStatus: CriteriaStatus;
    order: number;
    isLastCriteria: boolean;
    stepId: string;
}

export const CriteriaRender = ({
    isLastCriteria,
    name,
    contributors,
    criteria,
    stepIndex,
    stepStatus,
    order,
    stepId,
}: CriteriaRenderProps): JSX.Element => {
    const { workflowStepsLength, isPast } = useScopeChangeContext(
        ({ request: { id, workflowSteps, currentWorkflowStep } }) => ({
            requestId: id,
            workflowStepsLength: workflowSteps.length,
            isPast:
                (currentWorkflowStep?.order ?? 0) >
                (workflowSteps?.find(({ id }) => id === stepId)?.order ?? 0),
        })
    );

    const state = useAtom(actionWithCommentAtom);

    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
    const formattedDate = dateToDateTimeFormat(date);

    const [showAddContributor, setShowAddContributor] = useState(false);

    return (
        <WorkflowWrapper key={criteria.id}>
            <WorklowIconAndLine>
                <WorkflowIcon status={stepStatus} number={order + 1} />

                {stepIndex !== workflowStepsLength - 1 && <VerticalLine active={isPast} />}
            </WorklowIconAndLine>
            <WorkflowRow>
                <RowContent>
                    {state && state.criteriaId === criteria.id ? (
                        <CriteriaActionOverlay />
                    ) : (
                        <>
                            <span>
                                <div>{name}</div>
                                {criteria.signedAtUtc ? (
                                    <DetailText>
                                        <div>{`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}</div>
                                        {criteria.signedComment && <q>{criteria.signedComment}</q>}
                                    </DetailText>
                                ) : (
                                    <DetailText>{criteria.valueDescription}</DetailText>
                                )}
                            </span>
                            <CriteriaActionBar
                                stepId={stepId}
                                criteriaId={criteria.id}
                                stepOrder={order}
                                setShowAddContributor={() => setShowAddContributor(true)}
                            />
                        </>
                    )}
                </RowContent>
            </WorkflowRow>
            {showAddContributor && (
                <WorkflowRow>
                    <AddContributor close={() => setShowAddContributor(false)} stepId={stepId} />
                </WorkflowRow>
            )}
            {isLastCriteria && !isPast && (
                <>
                    {contributors.map((contributor) => (
                        <WorkflowRow key={contributor.id}>
                            <ContributorRender
                                key={contributor.id}
                                contributor={contributor}
                                stepId={stepId}
                            />
                        </WorkflowRow>
                    ))}
                </>
            )}
        </WorkflowWrapper>
    );
};
