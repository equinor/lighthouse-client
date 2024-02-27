import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { PhaseSelect } from '../../../DisciplineReleaseControl/Components/Form/Inputs/PhaseSelect';
import { getReleaseControlById } from '../../api/releaseControl/Request';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';
import { useRequestMutations } from '../../hooks/useRequestMutations';
import { releaseControlQueries } from '../../queries/queries';
import { releaseManifest } from '../../ReleaseControlApp';
import { CreateReleaseControlStepModel } from '../../types/releaseControl';
import { disciplineReleaseControlFactoryContext } from '../Factory/FactoryComponent';
import { ReleaseControlSidesheet } from '../sidesheet/ReleaseControlSidesheet';
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
    SelectionRow,
    Wrapper,
} from './releaseControlProcessForm.styles';
import { WorkflowCustomEditor } from './WorkflowEditor/WorkflowCustomEditor';
import { addStep, updateStep } from './WorkflowEditor/WorkflowEditorHelpers';
import { Autocomplete, Button, Icon, Progress } from '@equinor/eds-core-react';

export const ReleaseControlProcessForm = (): JSX.Element => {
    const { useAtomState, updateAtom, clearState } = DRCFormAtomApi;
    //Clear state once when opening the form
    useEffect(() => {
        clearState();
    }, []);

    const steps = useAtomState(({ workflowSteps }) => workflowSteps ?? []);
    const step = useAtomState(({ step }) => step ?? 'scope');
    const { workflowsQuery, workflowTemplateQuery } = releaseControlQueries;

    const [value, setValue] = useState<string | null>(null);
    const { data: workflows } = useQuery(workflowsQuery);
    useQuery([value], {
        queryFn: workflowTemplateQuery(value).queryFn,
        onSuccess: (data) => {
            if (!data) {
                return;
            }
            updateAtom({
                workflowSteps:
                    (data as any)[0].workflowStepTemplates.map(
                        (x: CreateReleaseControlStepModel) => {
                            x.criteriaTemplates = x.workflowStepCriteriaTemplates ?? [];
                            return x;
                        }
                    ) ?? [],
            });
        },
    });
    return (
        <Wrapper>
            <FormWrapper>
                {step === 'scope' && (
                    <FlexColumn>
                        General info
                        <TitleInput />
                        <DescriptionInput />
                        <PlannedDueDateInput />
                        <PhaseSelect />
                        <TagsInput />
                        <HtCablesInput />
                        <ReferencesInput />
                    </FlexColumn>
                )}
                {step === 'workflow' && (
                    <FlexColumn>
                        Workflow
                        <div style={{ fontWeight: 400, fontSize: '16px' }}>
                            Select a workflow to start with or create a complete custom flow.
                        </div>
                        <SelectionRow>
                            <Autocomplete
                                options={workflows?.map((x) => x.name) ?? []}
                                label="Workflow"
                                placeholder="Select new or predefined workflow"
                                onOptionsChange={(change) => {
                                    const id = workflows?.find(
                                        (x) => x.name === change.selectedItems[0]
                                    )?.id;
                                    setValue(id ?? null);
                                }}
                            />
                        </SelectionRow>
                        <WorkflowCustomEditor isEditMode={false} />
                        {steps.length !== 0 && (
                            <NewStepButton onClick={() => addStep(steps)}>Add step</NewStepButton>
                        )}
                    </FlexColumn>
                )}
            </FormWrapper>
            <SubmitButtonBar />
        </Wrapper>
    );
};

export const SubmitButtonBar = (): JSX.Element => {
    const { useIsValid, useAtomState } = DRCFormAtomApi;
    const [isCreated, setIsCreated] = useState(false);
    const isValid = useIsValid();

    const step = useAtomState(({ step }) => step ?? 'scope');

    const swapComponent = disciplineReleaseControlFactoryContext.useAtomState(
        ({ swapComponent }) => swapComponent
    );

    const { createReleaseControlMutation } = useRequestMutations();
    const queryClient = useQueryClient();
    const redirect = async (releaseControlId: string) => {
        if (!releaseControlId) return;
        queryClient.invalidateQueries({ queryKey: ['release'], exact: false });
        swapComponent(
            ReleaseControlSidesheet,
            await getReleaseControlById(releaseControlId),
            releaseManifest
        );
    };

    const { mutate, isLoading, error, isError } = useMutation(createReleaseControlMutation, {
        retry: false,
        onSuccess: (id) => {
            id && redirect(id);
            setIsCreated(true);
            if (!id) throw 'error';
        },
    });

    const onMutate = (draft: boolean) => {
        const { prepareReleaseControl } = DRCFormAtomApi;
        disciplineReleaseControlFactoryContext.readAtomValue().setHasUnsavedChanges(false);
        mutate({
            draft: draft,
            model: prepareReleaseControl(),
        });
    };

    if (isError) {
        console.log(error);
        return <div>Something went wrong creating new RC. Please try again later</div>;
    }
    return (
        <ActionBar>
            <NavigationButton>
                {step === 'workflow' && (
                    <Button variant="outlined" onClick={() => updateStep('scope')}>
                        <Icon
                            name={'chevron_left'}
                            color={tokens.colors.interactive.primary__resting.rgba}
                        />
                        Back to select scope
                    </Button>
                )}
            </NavigationButton>
            <ButtonContainer>
                {isLoading || isCreated ? (
                    <Button variant="ghost_icon" disabled>
                        <Progress.Dots color="primary" />
                    </Button>
                ) : (
                    <>
                        {step === 'scope' && (
                            <Button onClick={() => updateStep('workflow')}>
                                Next: select workflow
                                <Icon
                                    name={'chevron_right'}
                                    color={tokens.colors.text.static_icons__primary_white.hex}
                                />
                            </Button>
                        )}
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
