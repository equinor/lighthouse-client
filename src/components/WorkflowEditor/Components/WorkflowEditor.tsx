import { Icon, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Field } from '../../../apps/ScopeChangeRequest/Components/DetailView/Components/Field';
import { useHttpClient } from '../../../Core/Client/Hooks';
import { WorkflowEditorOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';

interface Workflow {
    id: string;
    name: string;
    projectId: string;
    plantId: string;
    requestType: string;
}

interface WorkflowTemplate {
    id: string;
    isPublished: true;
}

interface WorkflowEditorProps {
    options: WorkflowEditorOptions;
}
export const WorkflowEditor = ({
    options: { endpoint },
}: WorkflowEditorProps): JSX.Element | null => {
    const [workflow, setWorkflow] = useState<Workflow>();
    const [workflowTemplates, setWorkflowTemplates] = useState<WorkflowTemplate[]>();
    const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState<WorkflowTemplate>();

    const { scopeChange } = useHttpClient();

    const fetchWorkflow = async () => {
        const workflows = await scopeChange
            .fetch('https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows')
            .then((x) => x.json());
        setWorkflow(workflows[0]);
    };

    const fetchWorkflowTemplates = async () => {
        const workflowTemplates = await scopeChange
            .fetch(
                `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${workflow?.id}/templates`
            )
            .then((x) => x.json());
        setWorkflowTemplates(workflowTemplates);
    };

    useEffect(() => {
        fetchWorkflow();
    }, [endpoint]);

    useEffect(() => {
        console.log(workflow);
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
                {workflow && (
                    <Section>
                        <Inline>
                            <Icon name="folder" />
                            <p>{workflow.name}</p>
                        </Inline>
                        <SubFolder>
                            {workflowTemplates &&
                                workflowTemplates.map((x, i) => {
                                    return (
                                        <Entry
                                            onClick={() => setSelectedWorkflowTemplate(x)}
                                            key={x.id}
                                        >
                                            <Icon name="puzzle_filled" color="grey" />
                                            Template {i}
                                        </Entry>
                                    );
                                })}
                        </SubFolder>
                    </Section>
                )}
                {/* {workflow?.map((x) => {
                    return (
                        <Inline key={x.id}>
                            <Icon name="folder" /> {x.name}{' '}
                        </Inline>
                    );
                })} */}
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
                    {selectedWorkflowTemplate && <div>{selectedWorkflowTemplate.id}</div>}
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

const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

const Sidebar = styled.div`
    height: 100vh;
    width: 256px;
    border: 1px solid grey;
`;

const Inline = styled.div`
    display: flex;
    align-items: center;
`;

const SubFolder = styled.div`
    padding: 0em 1em;
`;

const Entry = styled.div`
    padding: 0.1em 0em;
    cursor: pointer;
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
