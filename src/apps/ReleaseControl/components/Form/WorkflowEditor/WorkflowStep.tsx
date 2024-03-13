import { Autocomplete, Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import { FunctionalRole, PCSPersonRoleSearch, WorkflowStepTemplate } from '@equinor/Workflow';
import { CommandButton, OnChangeJSON, ToggleTaskListButton, useHelpers } from '@remirror/react';
import { useCallback, useState } from 'react';
import { MarkdownEditor } from '../../../../../packages/MarkdownEditor/src';
import { HeatTraceExtension } from '../../../../../packages/MarkdownEditor/src/extensions/addHtTagsExtension';
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
    const value = formState.workflowSteps?.find(s => s.id === step.id);
    if (!value) {
      return;
    }
    const appendList = makeMarkdownListFromStringArray(formState?.scopeTags ?? []);
    value.description = value.description + "\n\n **Tags:** \n" + appendList;
    updateAtom(formState)
    setRefreshTrigger(s => !s)
  }

  const addHeatTracingCables = () => {
    const { updateAtom, readAtomValue } = DRCFormAtomApi;
    const formState = readAtomValue();
    const value = formState.workflowSteps?.find(s => s.id === step.id);
    if (!value) {
      return;
    }
    const appendList = makeMarkdownListFromStringArray(formState?.scopeHTTags ?? []);
    value.description = value.description + "\n\n **HT cables:** \n" + appendList;
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
          <>
            <DraggableIconWrapper className={DraggableHandleSelector}>
              <DraggableIcon></DraggableIcon>
            </DraggableIconWrapper>
            <NumberCircle>{step.order}</NumberCircle>
            <Selections>
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
            <IconMenu items={getWorkflowStepMenuActions(step, steps)} />
            <div style={{ marginTop: '10px' }}>
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
          </>
        )}
      </Line>
      <div style={{ width: "40%" }}>
        {!step.isCompleted && (
          <>
            <MarkdownEditor commandButtons={[
              <ToggleTaskListButton />,
              <CommandButton label={"Add heat tracing cables"} icon={<Icon size={16} name="heat_trace" />} commandName={"add_ht_cables"} onSelect={() => addHeatTracingCables()} enabled={(releaseControl?.scopeHTTags ?? [])?.length > 1} />,
              <CommandButton label={"Add tags"} icon={<Icon size={16} name="tag" />} commandName={"add_tags"} onSelect={() => addTags()} enabled={(releaseControl?.scopeTags ?? [])?.length > 1} />,
            ]} key={refreshTrigger ? "true" : "false"} initialContent={step.description ?? ""}>
              <DescriptionChanges stepId={step.id!} />
            </MarkdownEditor>
          </>
        )}
      </div>

    </>);

};

function makeMarkdownListFromStringArray(values: string[]) {
  return values.map(s => `- [ ] ${s}`).join("\n") ?? "";
}

type DescriptionChangesProps = {
  stepId: string;
}
export const DescriptionChanges = (props: DescriptionChangesProps): JSX.Element => {
  const { updateAtom, readAtomValue } = DRCFormAtomApi;
  const { getMarkdown } = useHelpers(true);

  const onChange = useCallback(() => {
    const formState = readAtomValue();
    const value = formState.workflowSteps?.find(s => s.id == props.stepId);
    if (!value) {
      return
    }
    value.description = getMarkdown();
    updateAtom(formState)
  }, [getMarkdown, updateAtom]);

  return <OnChangeJSON onChange={onChange} />;
};

