import { useState } from 'react';
import { useAtom } from '@dbeining/react-atom';

import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { AddContributor } from './AddContributor';
import { CriteriaStatus } from './CriteriaDetail';
import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../Utils/dateFormatting';

import { ContributorRender } from '../../Contributor/Contributor';
import { RowContent, WorkflowRow, WorkflowWrapper } from '../../workflowLayout.styles';
import { CriteriaActionBar } from './CriteriaActionBar';
import { CriteriaActionOverlay } from './CriteriaActionOverlay';
import { DetailText, VerticalLine, WorklowIconAndLine } from './criteria.styles';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { Contributor, Criteria } from '../../../../types/releaseControl';
import { Modal } from '@equinor/modal';
import { actionWithCommentAtom, SignWithCommentModal } from '@equinor/Workflow';
import { useGetReleaseControl, useWorkflowSigning } from '../../../../hooks';
import { MarkdownRemirrorViewer } from '@equinor/markdown-editor';
import { CircularProgress } from '@equinor/eds-core-react';

interface CriteriaRenderProps {
  name: string;
  description: string | null;
  criteria: Criteria;
  contributors: Contributor[];
  stepIndex: number;
  stepStatus: CriteriaStatus;
  order: number;
  isLastCriteria: boolean;
  stepId: string;
  hideOptions?: boolean;
  isStepCompleted?: boolean;
}

export const CriteriaRender = ({
  isLastCriteria,
  name,
  description,
  contributors,
  criteria,
  stepIndex,
  stepStatus,
  order,
  stepId,
  hideOptions,
  isStepCompleted
}: CriteriaRenderProps): JSX.Element => {
  const { requestId, workflowStepsLength, isPast } = useReleaseControlContext(
    ({ releaseControl: { id, workflowSteps, currentWorkflowStep } }) => ({
      requestId: id,
      workflowStepsLength: workflowSteps.length,
      isPast:
        (currentWorkflowStep?.order ?? 0) >
        (workflowSteps?.find(({ id }) => id === stepId)?.order ?? 0),
    })
  );
  const { isLoading } = useGetReleaseControl(requestId);
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
          {state && state.criteriaId === criteria.id && state.action === 'Reassign' ? (
            <CriteriaActionOverlay />
          ) : (
            <>
              {state &&
                state.criteriaId === criteria.id &&
                state.action !== 'Reassign' && (
                  <Modal
                    title={'Write a comment'}
                    content={
                      <SignWithCommentModal
                        action={state.action}
                        buttonText={state.buttonText}
                        criteriaId={state.criteriaId}
                        stepId={state.stepId}
                        requestId={requestId}
                        useWorkflowSigning={useWorkflowSigning}
                      />
                    }
                  />
                )}
              <span>
                <div>{name}</div>
                {criteria.signedAtUtc ? (
                  <DetailText>
                    {!isLoading ? (
                      <>
                        <div>
                          {`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}
                          {criteria.type ==
                            'RequireProcosysFunctionalRoleSignature' &&
                            `(${criteria.valueDescription})`}
                        </div>
                        {criteria.signedComment && (
                          <q>{criteria.signedComment}</q>
                        )}
                      </>
                    ) : (
                      <CircularProgress size={16} />
                    )}
                  </DetailText>
                ) : (
                  <>
                    <DetailText>{criteria.valueDescription}</DetailText>

                  </>
                )}
              </span>
              {!hideOptions && (
                <CriteriaActionBar
                  stepId={stepId}
                  criteriaId={criteria.id}
                  stepOrder={order}
                  setShowAddContributor={() => setShowAddContributor(true)}
                />
              )}
            </>
          )}
        </RowContent>
      </WorkflowRow>
      <div style={{ gridColumn: "2/5" }}>
        <MarkdownRemirrorViewer editable={isStepCompleted ? false : "checkboxes-only"} initialContent={description ?? ""} onCheckboxTicked={e => {
          console.log(e)
        }} />
      </div>
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

