import { Autocomplete, Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import { FunctionalRole, PCSPersonRoleSearch, WorkflowStepTemplate } from '@equinor/Workflow';
import { CommandButton, OnChangeJSON, ToggleTaskListButton, useHelpers } from '@remirror/react';
import { useCallback, useState } from 'react';
import { MarkdownEditor } from '../../../../../packages/MarkdownEditor/src';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { useReleaseControlContext } from '../../../hooks';
import { CreateReleaseControlStepModel, UserObject } from '../../../types/releaseControl';
import { CriteriaRender } from '../../Workflow/Criteria';
import { getCriteriaStatus } from '../../Workflow/Utils/getCriteriaStatus';
import { DraggableIcon } from './DraggableIcon';
import {
  CompletedCriteria,
  DraggableIconWrapper,
  HiddenDragIcon,
  Line,
  NumberCircle,
  ResponsibleSelect,
  Selections,
  StepSelect,
} from './workflow.styles';
import { DraggableHandleSelector } from './WorkflowCustomEditor';
import {
  getWorkflowStepMenuActions,
  removeStep,
  updateStepName,
  updateStepResponsible,
} from './WorkflowEditorHelpers';

interface WorkflowStepProps {
  step: CreateReleaseControlStepModel;
  steps: CreateReleaseControlStepModel[];
  functionalRoles?: FunctionalRole[];
  availableSteps: WorkflowStepTemplate[];
  isEditMode?: boolean;
}

export const WorkflowStep = ({
  step,
  steps,
  functionalRoles,
  availableSteps,
  isEditMode,
}: WorkflowStepProps): JSX.Element => {
  const { updateAtom } = DRCFormAtomApi;
  const releaseControl = useReleaseControlContext(rc => rc.releaseControl);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const addTags = () => {
    const { updateAtom, readAtomValue } = DRCFormAtomApi;
    const formState = readAtomValue();
    const workflowStep = formState.workflowSteps?.find(s => s.id === step.id);
    if (!workflowStep) {
      return;
    }
    const appendList = makeMarkdownListFromStringArray(formState?.tags?.map(s => s.value) ?? []);
    workflowStep.description = (workflowStep.description ?? "") + "\n\n **Tags:** \n" + appendList;
    updateAtom(formState)
    setRefreshTrigger(s => !s)
  }
  const addHeatTracingCables = () => {
    const { updateAtom, readAtomValue } = DRCFormAtomApi;
    const formState = readAtomValue();
    const workflowStep = formState.workflowSteps?.find(s => s.id === step.id);
    if (!workflowStep) {
      return;
    }
    const appendList = makeMarkdownListFromStringArray(formState?.htCables?.map(s => s.value) ?? []);
    workflowStep.description = (workflowStep.description ?? "") + "\n\n **HT cables:** \n" + appendList;
    updateAtom(formState)
    setRefreshTrigger(s => !s)
  }

  return (
    <>
      <Line>
        {step.isCompleted ? (
          step.criterias !== undefined ? (
            <CompletedCriteria>
              <CriteriaRender
                isStepCompleted={step.isCompleted ?? false}
                stepId={step.id ?? ''}
                key={step.id}
                description={null}
                contributors={[]}
                criteria={step.criterias[0] ?? []}
                isLastCriteria={false}
                name={step.name}
                order={step.order}
                stepIndex={0}
                stepStatus={getCriteriaStatus(step.criterias[0], false)}
                hideOptions={true}
              />
            </CompletedCriteria>
          ) : null
        ) : step.name === 'Initiate' ? (
          <>
            <HiddenDragIcon />
            <NumberCircle>{step.order}</NumberCircle>
            <Selections>
              <StepSelect>
                <Autocomplete
                  options={availableSteps.map((s) => s.name)}
                  label={'Step'}
                  selectedOptions={[step.name]}
                  readOnly={true}
                  onOptionsChange={(change) =>
                    updateAtom({
                      workflowSteps: updateStepName(
                        step,
                        steps,
                        change.selectedItems[0] ?? ''
                      ),
                    })
                  }
                />
              </StepSelect>
            </Selections>
            <IconMenu items={getWorkflowStepMenuActions(step, steps, true)} />
          </>
        ) : (
          <div style={{ display: "grid", gridTemplateRows: "50px 1fr", gridTemplateColumns: "5% 5% 80% 10%", alignItems: "center" }}>
            <DraggableIconWrapper style={{ gridRow: 1, gridColumn: 1 }} className={DraggableHandleSelector}>
              <DraggableIcon></DraggableIcon>
            </DraggableIconWrapper>
            <NumberCircle style={{ gridRow: 1, gridColumn: 2 }}>{step.order}</NumberCircle>
            <Selections style={{ gridRow: 1, gridColumn: 3 }}>
              <StepSelect>
                <Autocomplete
                  options={availableSteps.map((s) => s.name)}
                  label={''}
                  selectedOptions={[step.name]}
                  onOptionsChange={(change) =>
                    updateAtom({
                      workflowSteps: updateStepName(
                        step,
                        steps,
                        change.selectedItems[0] ?? ''
                      ),
                    })
                  }
                />
              </StepSelect>
              <ResponsibleSelect>
                <PCSPersonRoleSearch
                  onSelect={(value) => {
                    if (!value) return;
                    const responsibleObject = value.object as UserObject;
                    updateAtom({
                      workflowSteps: updateStepResponsible(
                        step,
                        steps,
                        !value ? '' : value.value,
                        responsibleObject.email,
                        value.type
                      ),
                    });
                  }}
                  classification="RELEASECONTROL"
                  value={
                    step?.criteriaTemplates?.[0]?.type ===
                      'RequireProcosysFunctionalRoleSignature'
                      ? step?.criteriaTemplates?.[0]?.value
                      : step?.criteriaTemplates?.[0]?.valueDescription
                  }
                  defaultResult={functionalRoles}
                />
              </ResponsibleSelect>

            </Selections>

            <div style={{ marginTop: '10px', gridRow: 1, display: "flex", alignItems: "center" }}>
              <IconMenu items={getWorkflowStepMenuActions(step, steps)} />
              <ClickableIcon
                name="close"
                onClick={() =>
                  updateAtom({
                    workflowSteps: removeStep(step, steps),
                  })
                }
              />
              {step.contributors && step.contributors?.length > 0 && (
                <Icon
                  title="This step has contributors"
                  color={tokens.colors.interactive.primary__resting.hex}
                  name="group"
                />
              )}
            </div>
            <div style={{ gridRow: 2, gridColumn: "2/5" }}>
              {!step.isCompleted && (
                <MarkdownEditor commandButtons={[
                  <ToggleTaskListButton />,
                  <CommandButton label={"Add heat tracing cables"} icon={<Icon size={16} name="heat_trace" />} commandName={"add_ht_cables"} onSelect={() => addHeatTracingCables()} enabled={(releaseControl?.scopeHTTags ?? [])?.length > 0} />,
                  <CommandButton label={"Add tags"} icon={<Icon size={16} name="tag" />} commandName={"add_tags"} onSelect={() => addTags()} enabled={(releaseControl?.scopeTags ?? [])?.length > 0} />,
                  //HACK: using key to trigger a remount, only way I could find to update initialcontent and trigger an update
                ]} key={refreshTrigger ? "true" : "false"} initialContent={step.description ?? ""}>
                  <DescriptionChanges stepId={step.id!} />
                </MarkdownEditor>
              )}
            </div>
          </div>
        )}
      </Line>
    </>);

};

function makeMarkdownListFromStringArray(tagNos: string[]) {
  return tagNos.map(s => `- [ ] ${s}`).join("\n") ?? "";
}

type DescriptionChangesProps = {
  stepId: string;
}
export const DescriptionChanges = (props: DescriptionChangesProps): JSX.Element => {
  const { updateAtom, readAtomValue } = DRCFormAtomApi;
  const { getMarkdown } = useHelpers(true);

  const onChange = useCallback(() => {
    const formState = readAtomValue();
    const workflowStep = formState.workflowSteps?.find(s => s.id == props.stepId);
    if (!workflowStep) {
      return
    }
    workflowStep.description = getMarkdown();
    updateAtom(formState)
  }, [getMarkdown, updateAtom]);

  return <OnChangeJSON onChange={onChange} />;
};

