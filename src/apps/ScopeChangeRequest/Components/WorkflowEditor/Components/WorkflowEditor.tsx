import { Button } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WorkflowStep } from '../../../Types/scopeChangeRequest';
import { DraggableItem, DraggableItemsContainer } from '@equinor/VisualEditor';

interface Workflow {
    created: string;
    createdBy: string;
    id: string;
    isPublished: boolean;
    lastModified: string | null;
    lastModifiedBy: string | null;
    StepTemplates: TemplateStep[];
}

interface WorkflowSteps {
    StepTemplates: TemplateStep[];
}

type TemplateStep = Omit<WorkflowStep, 'isCompleted' | 'id' | 'isCurrent' | 'criterias'>;

export const WorkflowEditor = (): JSX.Element | null => {
    const tempWorkflowID = '6752c4c4-214d-4aae-ff2d-08d9bb10809e';

    const [workflow, setWorkflow] = useState<Workflow>({
        id: '5cc0cb9c-91ad-425b-d163-08d9bb125bf7',
        isPublished: false,
        StepTemplates: [
            {
                name: 'initiator',
                order: 0,
            },
            {
                name: 'approver',
                order: 1,
            },
        ],
        created: '2021-12-09T07:01:35.3764123',
        createdBy: 'some user',
        lastModified: null,
        lastModifiedBy: null,
    });
    const [steps, setSteps] = useState<TemplateStep[]>([
        {
            name: 'initiator',
            order: 0,
        },
        {
            name: 'approver',
            order: 1,
        },
    ]);
    const [count, setCount] = useState<number>(steps.length + 1);

    const onPublish = async () => {
        const updatedWorkflow = { ...workflow, steps: steps };
        console.log(updatedWorkflow);
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        };

        const res = await fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${tempWorkflowID}/templates/${workflow.id}/publish`,
            requestOptions
        );
        console.log(await res.json);
        console.log('Published');
    };

    const onSave = async () => {
        const workflowSteps: WorkflowSteps = { StepTemplates: steps };
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workflowSteps),
        };

        const res = await fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${tempWorkflowID}/templates/${workflow.id}`,
            requestOptions
        );
        console.log(await res.json);
        console.log('Saved');
    };

    const onCreate = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ StepTemplates: steps }),
        };

        const res = await fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${tempWorkflowID}/templates`,
            requestOptions
        );
        console.log(await res.json);
        console.log('Created');
    };

    const onChange = (newDragItems: DraggableItem<TemplateStep>[]) => {
        const newSteps: TemplateStep[] = [];
        newDragItems.forEach((x) => {
            const step: TemplateStep = {
                name: x.item.name,
                order: x.id,
            };
            newSteps.push(step);
        });
        setSteps(newSteps);
    };

    return (
        <WorkflowEditorWrapper>
            <h1>Workflow editor</h1>
            <p>{workflow?.id}</p>

            <DraggableItemsContainer<TemplateStep>
                onChange={onChange}
                items={steps}
                viewKey={'name'}
            />

            <WorkflowStepsOutline>
                <Button
                    onClick={() => {
                        setSteps([...steps, { name: `Step ${count}`, order: 1 }]);
                        setCount(count + 1);
                        console.log(steps);
                    }}
                >
                    +
                </Button>
            </WorkflowStepsOutline>
            <ButtonPair>
                {workflow.id && !workflow.isPublished ? (
                    <>
                        <Button onClick={onPublish} disabled={!steps || steps.length <= 0}>
                            Publish
                        </Button>
                        <HorizontalSpacer />
                        <Button
                            onClick={onSave}
                            disabled={!steps || steps.length <= 0}
                            variant={'outlined'}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <Button onClick={onCreate} disabled={!steps || steps.length <= 0}>
                        Create
                    </Button>
                )}
            </ButtonPair>
        </WorkflowEditorWrapper>
    );
};

const ButtonPair = styled.div`
    display: flex;
    flex-direction: row;
`;

const HorizontalSpacer = styled.div`
    margin: 5px;
`;

const WorkflowStepsOutline = styled.div``;

const WorkflowStepBox = styled.div`
    display: flex;
    margin-bottom: 5px;
    border: solid;
    align-items: center;
`;

const WorkflowEditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// const getWorkflow = async (): Promise<Workflow> => {
//     const requestOptions = {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     };
//     const res = await fetch(
//         `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/54e6ddcd-d96d-4a9b-8a81-08d9bae19cb3/templates`,
//         requestOptions
//     );
//     const b = await res.json();
//     return b;

//     // .then((response) => response.json())
//     // .then((data) => { return data });
// };

// useEffect(() => {
//     const a = getWorkflow();
//     setWorkflow(a as unknown as Workflow);
//     console.log(a);

//     //
// }, []);
