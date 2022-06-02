import { Button, Progress, SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { PhaseSelect } from '../../../DisciplineReleaseControl/Components/Form/Inputs/PhaseSelect';
import { getReleaseControlById } from '../../api/releaseControl/Request';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';
import { useRequestMutations } from '../../hooks/useRequestMutations';
import { releaseManifest } from '../../ReleaseControlApp';
import { disciplineReleaseControlFactoryContext } from '../Factory/FactoryComponent';
import { ReleaseControlSidesheet } from '../sidesheet/ReleaseControlSidesheet';
import { DescriptionInput, PlannedDueDateInput, ReferencesInput, TitleInput } from './Inputs';
import { FlexColumn, FormWrapper } from './releaseControlProcessForm.styles';
import { WorkflowCustomEditor } from './WorkflowEditor/WorkflowCustomEditor';
import { getNewWorkflowSteps } from './WorkflowEditor/WorkflowEditorHelpers';


export const ReleaseControlProcessForm = (): JSX.Element => {
    const { updateAtom } = DRCFormAtomApi;

    return (
        <>
            <div>
                <FormWrapper>
                    <FlexColumn>
                        General info
                        <TitleInput />
                        <DescriptionInput />
                        <PlannedDueDateInput />
                        <PhaseSelect />
                        <ReferencesInput />
                    </FlexColumn>
                    <FlexColumn>
                        Workflow
                        <div style={{ fontWeight: 400, fontSize: '16px' }}>
                            Select a workflow to start with or create a complete custom flow.
                        </div>
                        <SelectionRow>
                            <SingleSelect
                                items={predefinedWorkflows}
                                label="Workflow"
                                placeholder="Select predefined workflow"
                                size={30}
                                handleSelectedItemChange={() => {
                                    return null;
                                }}
                            />
                            <Button
                                style={{ width: '100px', marginLeft: '20px', marginTop: '16px' }}
                                onClick={() =>
                                    updateAtom({
                                        workflowSteps: getNewWorkflowSteps(),
                                    })
                                }
                            >
                                New flow
                            </Button>
                        </SelectionRow>
                        <WorkflowCustomEditor />
                    </FlexColumn>
                </FormWrapper>
                <SubmitButtonBar />
            </div>
        </>
    );
};

export const SubmitButtonBar = (): JSX.Element => {
    const { useIsValid } = DRCFormAtomApi;

    const isValid = useIsValid();

    const swapComponent = disciplineReleaseControlFactoryContext.useAtomState(
        ({ swapComponent }) => swapComponent
    );

    const { createReleaseControlMutation } = useRequestMutations();
    const queryClient = useQueryClient();
    const redirect = async (releaseControlId: string) => {
        if (!releaseControlId) return;

        swapComponent(
            ReleaseControlSidesheet,
            await getReleaseControlById(releaseControlId),
            releaseManifest
        );
        queryClient.invalidateQueries();
    };

    const { mutate, isLoading } = useMutation(createReleaseControlMutation, {
        retry: 0,
        onSuccess: (id) => {
            id && redirect(id);
            if (!id) throw 'error';
        },
    });

    const onMutate = (draft: boolean) => {
        const { prepareRequest } = DRCFormAtomApi;

        mutate({
            draft: draft,
            model: prepareRequest(),
        });
    };

    return (
        <ActionBar>
            <ButtonContainer>
                {isLoading ? (
                    <Button variant="ghost_icon" disabled>
                        <Progress.Dots color="primary" />
                    </Button>
                ) : (
                    <>
                        <Button disabled={!isValid} onClick={() => onMutate(false)}>
                            Submit
                        </Button>
                        <Button
                            disabled={!isValid}
                            onClick={() => onMutate(true)}
                            variant="outlined"
                        >
                            Save
                        </Button>
                    </>
                )}
            </ButtonContainer>
        </ActionBar>
    );
};

export const ButtonContainer = styled.div`
    flex-direction: row;
    gap: 0.5em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1em;
`;

export const ActionBar = styled.div`
    height: 64px;
    width: 100%;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    background-color: white;
`;

export const SelectionRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const predefinedWorkflows = [
    'Commissioning - With HT',
    'Commissioning - No HT',
    'Operation - With HT',
    'Operation - No HT',
];
