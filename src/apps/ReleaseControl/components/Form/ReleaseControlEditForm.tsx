import { Button, Progress } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import styled from 'styled-components';
import { disableEditMode } from '../../Atoms/editModeAtom';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';

import { useReleaseControlContext } from '../../hooks/useReleaseControlContext';
import { useReleaseControlMutation } from '../../hooks/useReleaseControlMutation';
import { useRequestMutations } from '../../hooks/useRequestMutations';
import { releaseControlMutationKeys } from '../../queries/releaseControlMutationKeys';
import { DescriptionInput, PlannedDueDateInput, ReferencesInput, TitleInput } from './Inputs';
import { NewStepButton } from './ReleaseControlProcessForm';
import {
    ActionBar,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
} from './releaseControlProcessForm.styles';
import { WorkflowCustomEditor } from './WorkflowEditor/WorkflowCustomEditor';
import { addStepAfter } from './WorkflowEditor/WorkflowEditorHelpers';

export const ReleaseControlEditForm = (): JSX.Element => {
    const { useAtomState, updateAtom } = DRCFormAtomApi;
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const steps = useAtomState(({ workflowSteps }) => workflowSteps ?? []);

    useEffect(() => {
        const { clearState, updateAtom } = DRCFormAtomApi;
        clearState();
        updateAtom({
            ...releaseControl,
        });
        return () => {
            clearState();
        };
    }, []);

    return (
        <>
            <Wrapper>
                <FormWrapper>
                    <FlexColumn>
                        General info
                        <TitleInput />
                        <DescriptionInput />
                        <PlannedDueDateInput />
                        <ReferencesInput />
                    </FlexColumn>
                    <FlexColumn>
                        Workflow
                        <WorkflowCustomEditor />
                        {steps.length !== 0 && (
                            <NewStepButton>
                                <Button
                                    style={{
                                        width: '100px',
                                        marginLeft: '20px',
                                        marginTop: '16px',
                                    }}
                                    onClick={() =>
                                        updateAtom({
                                            workflowSteps: addStepAfter(
                                                {
                                                    order: steps.length,
                                                    name: '',
                                                    allowContributors: true,
                                                    criteriaTemplates: [],
                                                    criterias: [],
                                                },
                                                steps
                                            ),
                                        })
                                    }
                                >
                                    Add step
                                </Button>
                            </NewStepButton>
                        )}
                    </FlexColumn>
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
            <ButtonContainer>
                <>
                    {isLoading ? (
                        <Button variant="ghost_icon" disabled>
                            <Progress.Dots color="primary" />
                        </Button>
                    ) : (
                        <>
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
