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
import { actionWithCommentAtom, SignWithCommentModal, throwOnError } from '@equinor/Workflow';
import { useGetReleaseControl, useWorkflowSigning } from '../../../../hooks';
import { CircularProgress } from '@equinor/eds-core-react-old';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { httpClient } from '../../../../../../Core/Client/Functions';
import { MarkdownRemirrorViewer } from '../../../../../../packages/MarkdownEditor/src';
import { CriteriaItem } from './CriteriaItem';

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
  isStepCompleted,
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
              {state && state.criteriaId === criteria.id && state.action !== 'Reassign' && (
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
                          {criteria.type == 'RequireProcosysFunctionalRoleSignature' &&
                            `(${criteria.valueDescription})`}
                        </div>
                        {criteria.signedComment && <q>{criteria.signedComment}</q>}
                      </>
                    ) : (
                      <CircularProgress size={16} />
                    )}
                  </DetailText>
                ) : (
                  <CriteriaItem criteria={criteria}></CriteriaItem>
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
      {description && (
        <MarkdownDescriptionWrapper style={{ gridColumn: '2/5' }}>
          <WorkflowStepMarkdownDescription
            stepId={stepId}
            description={description}
            isStepCompleted={isStepCompleted ?? false}
          />
        </MarkdownDescriptionWrapper>
      )}
      {showAddContributor && (
        <WorkflowRow>
          <AddContributor close={() => setShowAddContributor(false)} stepId={stepId} />
        </WorkflowRow>
      )}
      {isLastCriteria && (
        <>
          {contributors.map((contributor) => (
            <WorkflowRow key={contributor.id}>
              <ContributorRender key={contributor.id} contributor={contributor} stepId={stepId} />
            </WorkflowRow>
          ))}
        </>
      )}
    </WorkflowWrapper>
  );
};

type WorkflowStepMarkdownDescriptionProps = {
  isStepCompleted: boolean;
  stepId: string;
  description: string;
};

function WorkflowStepMarkdownDescription(props: WorkflowStepMarkdownDescriptionProps) {
  const releaseControlId = useReleaseControlContext((r) => r.releaseControl.id);

  const { mutateAsync, error } = useMutation<void, Error, UpdateWorkflowMarkdown>({
    mutationFn: async (args) => updateWorkflowStepMarkdownDescription(args),
  });

  return (
    <>
      <MarkdownRemirrorViewer
        key={JSON.stringify(error)}
        editable={props.isStepCompleted ? false : 'checkboxes-only'}
        initialContent={props.description}
        onCheckboxTicked={(markdown) => {
          mutateAsync({
            description: markdown,
            releaseControlId: releaseControlId,
            stepId: props.stepId,
          });
        }}
      />
    </>
  );
}
const MarkdownDescriptionWrapper = styled.div`
  grid-column: 2/5;
`;
type UpdateWorkflowMarkdown = {
  releaseControlId: string;
  stepId: string;
  description: string;
};
async function updateWorkflowStepMarkdownDescription({
  stepId,
  description,
  releaseControlId,
}: UpdateWorkflowMarkdown) {
  const { scopeChange } = httpClient();
  const res = await scopeChange.fetch(
    `api/releasecontrol/${releaseControlId}/workflow/step/${stepId}/description`,
    {
      headers: {
        ['content-type']: 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ description: description }),
    }
  );

  await throwOnError(res, "Failed to update description")
}
