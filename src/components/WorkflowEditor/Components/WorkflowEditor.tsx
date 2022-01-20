import { Button, Icon, SingleSelect, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { VisualEditor } from '@equinor/VisualEditor';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Field } from '../../../apps/ScopeChangeRequest/Components/DetailView/Components/Field';
import { useApiClient } from '../../../Core/Client/Hooks/useApiClient';
import { WorkflowEditorOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { TextInput } from '../../../packages/Form/src/Components/TextInput';
import { createTemplate } from '../API/createTemplate';
import { publishTemplate } from '../API/publishTemplate';
import { saveTemplate } from '../API/saveTemplate';
import { Step } from '../Types/Workflow';

interface Workflow {
    id: string;
    name: string;
    projectId: string;
    plantId: string;
    requestType: string;
}

interface WorkflowEditorProps {
    options: WorkflowEditorOptions;
}
export const WorkflowEditor = ({
    options: { endpoint },
}: WorkflowEditorProps): JSX.Element | null => {
    const [workflow, setWorkflow] = useState<Workflow>();
    const [workflowTemplates, setWorkflowTemplates] = useState<Workflow>();

    const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState<Workflow>();
    const workflowId = '6752c4c4-214d-4aae-ff2d-08d9bb10809e';
    const { scopeChange } = useApiClient();

    const fetchWorkflow = async () => {
        setWorkflow(
            await scopeChange
                .fetch(
                    'https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows'
                )
                .then((x) => x.json())
        );
    };

    const fetchWorkflowTemplates = async () => {
        setWorkflowTemplates(
            await scopeChange
                .fetch(
                    `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${workflow?.id}/templates`
                )
                .then((x) => x.json())
        );
    };

    useEffect(() => {
        fetchWorkflow();
    }, [endpoint]);

    useEffect(() => {
        if (!workflow) return;
        fetchWorkflowTemplates();
    }, [workflow]);

    // const loadData = async (endpoint: string) => {
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     };

    //     const res = await fetch(endpoint, requestOptions);
    //     const data: Workflow[] = await res.json();
    //     setWorkflows(data);
    //     setSelectedWorkflowTemplate(data[1]);
    // };

    // const PublishButton = () => {
    //     if (
    //         !selectedWorkflowTemplate ||
    //         !selectedWorkflowTemplate.id ||
    //         selectedWorkflowTemplate.isPublished
    //     ) {
    //         return <></>;
    //     }
    //     return (
    //         <Button onClick={() => publishTemplate(workflowId, selectedWorkflowTemplate.id)}>
    //             Publish
    //         </Button>
    //     );
    // };

    // const SaveButton = ({ items }: { items: Step[] }) => {
    //     if (
    //         !selectedWorkflowTemplate ||
    //         !selectedWorkflowTemplate.id ||
    //         selectedWorkflowTemplate.isPublished
    //     ) {
    //         return <></>;
    //     }
    //     return (
    //         <Button onClick={() => saveTemplate(workflowId, selectedWorkflowTemplate.id, items)}>
    //             Save
    //         </Button>
    //     );
    // };

    // const CreateButton = ({ items }: { items: Step[] }) => {
    //     if (selectedWorkflowTemplate?.id) {
    //         return <></>;
    //     }
    //     return <Button onClick={() => createTemplate(workflowId, items)}>Create</Button>;
    // };

    return (
        <Wrapper>
            <Sidebar>
                {workflow?.map((x) => {
                    return (
                        <Inline key={x.id}>
                            <Icon name="folder" /> {x.name}{' '}
                        </Inline>
                    );
                })}
            </Sidebar>
            <div>
                <Header>
                    <Title>Workflow</Title>
                    <Inline
                        style={{
                            color: `${tokens.colors.interactive.primary__resting.hex}`,
                            fontSize: '14px',
                        }}
                    >
                        <Icon name="add" />
                        New workflow
                    </Inline>
                </Header>
                <Content>
                    <Field
                        label="Workflow title"
                        value={
                            <TextField
                                id={'123'}
                                style={{ width: '264px' }}
                                placeholder="Scope change requests, IC"
                                title="Workflow title"
                            />
                        }
                    />
                </Content>
            </div>
        </Wrapper>
    );

    // if (!selectedWorkflowTemplate) {
    //     return null;
    // }
    // return (
    //     <>
    //         <Header>
    //             <TemplatePublished>
    //                 {selectedWorkflowTemplate && selectedWorkflowTemplate.isPublished && (
    //                     <>
    //                         <p>This workflow is published and is therefore locked for editing</p>
    //                         <Button
    //                             onClick={() =>
    //                                 setSelectedWorkflowTemplate({
    //                                     ...selectedWorkflowTemplate,
    //                                     id: '',
    //                                     isPublished: false,
    //                                 })
    //                             }
    //                         >
    //                             Copy template
    //                         </Button>
    //                     </>
    //                 )}
    //             </TemplatePublished>
    //         </Header>
    //         <div>
    //             <SingleSelect
    //                 items={['Punch', 'Query', 'NCR', 'SWCR']}
    //                 label={'Select workflow'}
    //                 handleSelectedItemChange={(select) => {
    //                     switch (select.selectedItem) {
    //                         default: {
    //                             loadData(endpoint ?? '');
    //                         }
    //                     }
    //                 }}
    //             />
    //         </div>
    //         <Button
    //             onClick={() =>
    //                 setSelectedWorkflowTemplate({
    //                     created: '',
    //                     createdBy: '',
    //                     id: '',
    //                     isPublished: false,
    //                     steps: [],
    //                     lastModified: null,
    //                     lastModifiedBy: null,
    //                 })
    //             }
    //         >
    //             Create new template
    //         </Button>
    //         {selectedWorkflowTemplate && (
    //             <VisualEditor<Step>
    //                 buttons={[PublishButton, CreateButton, SaveButton]}
    //                 items={selectedWorkflowTemplate?.steps}
    //                 newItemFunction={() => {
    //                     return { id: '', name: 'new step', order: 2 };
    //                 }}
    //                 viewKey={'name'}
    //             />
    //         )}
    //     </>
    // );
};

const Sidebar = styled.div`
    height: 100vh;
    width: 256px;
    border: 1px solid grey;
`;

const Inline = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 76px;
    border-bottom: 1px solid grey;
    width: calc(100vw - 256px);
    justify-content: space-between;
    align-items: center;
    margin: 0px 5px;
`;

const Content = styled.div`
display: flex;
overflow scroll;
`;

const Wrapper = styled.div`
    display: flex;
`;

const TemplatePublished = styled.div`
    display: flex;
    flex-direction: column;
`;
