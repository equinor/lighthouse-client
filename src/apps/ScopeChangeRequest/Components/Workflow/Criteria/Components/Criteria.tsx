import { useAtom } from '@dbeining/react-atom';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
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
    const { workflowStepsLength } = useScopeChangeContext(({ request: { id, workflowSteps } }) => ({
        requestId: id,
        workflowStepsLength: workflowSteps.length,
    }));

    const state = useAtom(actionWithCommentAtom);

    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
    const formattedDate = dateToDateTimeFormat(date);

    const [showAddContributor, setShowAddContributor] = useState(false);

    return (
        <WorkflowWrapper key={criteria.id}>
            <WorklowIconAndLine>
                <WorkflowIcon status={stepStatus} number={order + 1} />

                {stepIndex !== workflowStepsLength - 1 && <VerticalLine />}
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
            {isLastCriteria && (
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

const VerticalLine = styled.div`
    border-left: 1px solid ${tokens.colors.interactive.primary__resting.hex};
    height: 100%;
    width: 1px;
    margin-top: 5px;
`;

const DetailText = styled.div`
    font-size: 14px;
`;

const WorklowIconAndLine = styled.div`
    grid-column: col / span 1;
    /* No clue why this works */
    grid-row: 1 / span 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;
