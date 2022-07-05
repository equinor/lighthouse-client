import { Button, Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';

import styled from 'styled-components';
import { TypedSelectOption } from '../../../ScopeChangeRequest/api/Search/searchType';
import { disableEditMode } from '../../Atoms/editModeAtom';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';

import { useReleaseControlContext } from '../../hooks/useReleaseControlContext';
import { useReleaseControlMutation } from '../../hooks/useReleaseControlMutation';
import { useRequestMutations } from '../../hooks/useRequestMutations';
import { releaseControlMutationKeys } from '../../queries/releaseControlMutationKeys';
import { FamTag } from '../../types/releaseControl';
import { DescriptionInput, PlannedDueDateInput, ReferencesInput, TitleInput } from './Inputs';
import { HtCablesInput } from './Inputs/Scope/HtCables';
import { TagsInput } from './Inputs/Scope/Tags';
import {
    ActionBar,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
    NavigationButton,
    NewStepButton,
} from './releaseControlProcessForm.styles';
import { WorkflowCustomEditor } from './WorkflowEditor/WorkflowCustomEditor';
import { addStep, updateStep } from './WorkflowEditor/WorkflowEditorHelpers';
import { useUnpackReferences } from '../../hooks/useUnpackReferences';

export const ReleaseControlEditForm = (): JSX.Element => {
    const { useAtomState } = DRCFormAtomApi;
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const steps = useAtomState(({ workflowSteps }) => workflowSteps ?? []);
    const step = useAtomState(({ step }) => step ?? 'scope');

    useEffect(() => {
        const { clearState, updateAtom } = DRCFormAtomApi;
        clearState();
        updateAtom({
            ...releaseControl,
            documentNumbers: releaseControl?.documents?.map((x) => x.id),
            punchListItemIds: releaseControl?.punchListItems?.map((x) => x.id),
            tags: releaseControl?.scopeTags?.map(
                (x: FamTag): TypedSelectOption => ({
                    label: `${x.tagNo}`,
                    value: x.tagNo,
                    type: 'famtag',
                    searchValue: x.tagNo,
                    object: x,
                })
            ),
            htCables: releaseControl?.scopeHTTags?.map(
                (x: FamTag): TypedSelectOption => ({
                    label: `${x.tagNo}`,
                    value: x.tagNo,
                    type: 'htcable',
                    searchValue: x.tagNo,
                    object: x,
                })
            ),
        });
        return () => {
            clearState();
        };
    }, []);

    useUnpackReferences({ releaseControl });

    return (
        <>
            <Wrapper>
                <FormWrapper>
                    {step === 'scope' && (
                        <FlexColumn>
                            General info
                            <TitleInput />
                            <DescriptionInput />
                            <PlannedDueDateInput />
                            <TagsInput />
                            <HtCablesInput />
                            <ReferencesInput />
                        </FlexColumn>
                    )}
                    {step === 'workflow' && (
                        <FlexColumn>
                            Workflow
                            <WorkflowCustomEditor />
                            {steps.length !== 0 && (
                                <NewStepButton onClick={() => addStep(steps)}>
                                    Add step
                                </NewStepButton>
                            )}
                        </FlexColumn>
                    )}
                </FormWrapper>
                <SubmitActionBar />
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin: 24px 32px;
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const SubmitActionBar = (): JSX.Element => {
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const { patchKey } = releaseControlMutationKeys(releaseControl.id);

    const isValid = DRCFormAtomApi.useIsValid();

    const { editReleaseControlMutation } = useRequestMutations();
    const { useAtomState } = DRCFormAtomApi;
    const step = useAtomState(({ step }) => step ?? 'scope');

    const { isLoading, mutate } = useReleaseControlMutation(
        releaseControl.id,
        patchKey,
        editReleaseControlMutation,
        {
            onSuccess: disableEditMode,
        }
    );

    const handleSave = (setAsOpen: boolean) => {
        const { prepareRequest } = DRCFormAtomApi;
        mutate({
            model: prepareRequest(),
            setAsOpen: setAsOpen,
        });
    };

    return (
        <ActionBar>
            <NavigationButton>
                {step === 'workflow' && (
                    <Button variant="outlined" onClick={() => updateStep('scope')}>
                        <Icon
                            name={'chevron_left'}
                            color={tokens.colors.interactive.primary__resting.rgba}
                        />
                        Back to edit scope
                    </Button>
                )}
            </NavigationButton>
            <ButtonContainer>
                <>
                    {isLoading ? (
                        <Button variant="ghost_icon" disabled>
                            <Progress.Dots color="primary" />
                        </Button>
                    ) : (
                        <>
                            {step === 'scope' && (
                                <Button onClick={() => updateStep('workflow')}>
                                    Next: edit workflow
                                    <Icon
                                        name={'chevron_right'}
                                        color={tokens.colors.text.static_icons__primary_white.hex}
                                    />
                                </Button>
                            )}
                            <Button variant="outlined" onClick={disableEditMode}>
                                Cancel
                            </Button>
                            <Button disabled={!isValid} onClick={() => handleSave(false)}>
                                Save
                            </Button>
                            {releaseControl.state === 'Draft' && (
                                <Button disabled={!isValid} onClick={() => handleSave(true)}>
                                    Submit
                                </Button>
                            )}
                        </>
                    )}
                </>
            </ButtonContainer>
        </ActionBar>
    );
};
