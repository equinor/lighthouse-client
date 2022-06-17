import { Button, Progress, SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { PhaseSelect } from '../../../DisciplineReleaseControl/Components/Form/Inputs/PhaseSelect';
import { getReleaseControlById } from '../../api/releaseControl/Request';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';
import { useRequestMutations } from '../../hooks/useRequestMutations';
import { releaseControlQueries } from '../../queries/queries';
import { releaseManifest } from '../../ReleaseControlApp';
import { disciplineReleaseControlFactoryContext } from '../Factory/FactoryComponent';
import { ReleaseControlSidesheet } from '../sidesheet/ReleaseControlSidesheet';
import { DescriptionInput, PlannedDueDateInput, ReferencesInput, TitleInput } from './Inputs';
import { FlexColumn, FormWrapper } from './releaseControlProcessForm.styles';
import { WorkflowCustomEditor } from './WorkflowEditor/WorkflowCustomEditor';
import { addStep } from './WorkflowEditor/WorkflowEditorHelpers';

export const ReleaseControlProcessForm = (): JSX.Element => {
    const { useAtomState, updateAtom, readAtomValue } = DRCFormAtomApi;
    const steps = useAtomState(({ workflowSteps }) => workflowSteps ?? []);

    const { workflowsQuery, workflowTemplateQuery } = releaseControlQueries;

    const [value, setValue] = useState<string | null>(null);
    const { data: workflows } = useQuery(workflowsQuery);
    useQuery([value], {
        queryFn: workflowTemplateQuery(value).queryFn,
        onSuccess: (data) => {
            updateAtom({ workflowSteps: data[0].workflowStepTemplates ?? [] });
        },
    });

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
                                items={workflows?.map((x) => x.name) ?? []}
                                label="Workflow"
                                placeholder="Select new or predefined workflow"
                                size={35}
                                handleSelectedItemChange={(change) => {
                                    const id = workflows?.find(
                                        (x) => x.name === change.selectedItem
                                    )?.id;
                                    setValue(id ?? null);
                                }}
                            />
                        </SelectionRow>
                        <WorkflowCustomEditor />
                        {steps.length !== 0 && (
                            <NewStepButton onClick={() => addStep(steps)}>Add step</NewStepButton>
                        )}
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
        disciplineReleaseControlFactoryContext.readAtomValue().setHasUnsavedChanges(false);
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
                        {/* TODO - fix and clarify use of saving as draft */}
                        {/* <Button
                            disabled={!isValid}
                            onClick={() => onMutate(true)}
                            variant="outlined"
                        >
                            Save
                        </Button> */}
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

export const NewStepButton = styled(Button)`
    margin-bottom: 20px;
    margin-left: 60px;
    margin-top: 16px;
    width: 100px;
`;
