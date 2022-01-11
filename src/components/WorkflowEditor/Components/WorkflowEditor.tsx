import { Button, SingleSelect } from '@equinor/eds-core-react';
import { VisualEditor } from '@equinor/VisualEditor';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WorkflowEditorOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { createTemplate } from '../API/createTemplate';
import { publishTemplate } from '../API/publishTemplate';
import { saveTemplate } from '../API/saveTemplate';
import { Step, Workflow } from '../Types/Workflow';

interface WorkflowEditorProps {
    options: WorkflowEditorOptions;
}
export const WorkflowEditor = ({
    options: { endpoint },
}: WorkflowEditorProps): JSX.Element | null => {
    const [workflows, setWorkflows] = useState<Workflow[]>();
    const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState<Workflow>();
    const workflowId = '6752c4c4-214d-4aae-ff2d-08d9bb10809e';

    useEffect(() => {
        // loadData(endpoint ?? '');
    }, [endpoint]);

    const loadData = async (endpoint: string) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const res = await fetch(endpoint, requestOptions);
        const data: Workflow[] = await res.json();
        setWorkflows(data);
        setSelectedWorkflowTemplate(data[1]);
    };

    const PublishButton = () => {
        if (
            !selectedWorkflowTemplate ||
            !selectedWorkflowTemplate.id ||
            selectedWorkflowTemplate.isPublished
        ) {
            return <></>;
        }
        return (
            <Button onClick={() => publishTemplate(workflowId, selectedWorkflowTemplate.id)}>
                Publish
            </Button>
        );
    };

    const SaveButton = ({ items }: { items: Step[] }) => {
        if (
            !selectedWorkflowTemplate ||
            !selectedWorkflowTemplate.id ||
            selectedWorkflowTemplate.isPublished
        ) {
            return <></>;
        }
        return (
            <Button onClick={() => saveTemplate(workflowId, selectedWorkflowTemplate.id, items)}>
                Save
            </Button>
        );
    };

    const CreateButton = ({ items }: { items: Step[] }) => {
        if (selectedWorkflowTemplate?.id) {
            return <></>;
        }
        return <Button onClick={() => createTemplate(workflowId, items)}>Create</Button>;
    };

    // if (!selectedWorkflowTemplate) {
    //     return null;
    // }
    return (
        <>
            <Header>
                <TemplatePublished>
                    {selectedWorkflowTemplate && selectedWorkflowTemplate.isPublished && (
                        <>
                            <p>This workflow is published and is therefore locked for editing</p>
                            <Button
                                onClick={() =>
                                    setSelectedWorkflowTemplate({
                                        ...selectedWorkflowTemplate,
                                        id: '',
                                        isPublished: false,
                                    })
                                }
                            >
                                Copy template
                            </Button>
                        </>
                    )}
                </TemplatePublished>
            </Header>
            <div>
                <SingleSelect
                    items={['Punch', 'Query', 'NCR', 'SWCR']}
                    label={'Select workflow'}
                    handleSelectedItemChange={(select) => {
                        switch (select.selectedItem) {
                            default: {
                                loadData(endpoint ?? '');
                            }
                        }
                    }}
                />
            </div>
            <Button
                onClick={() =>
                    setSelectedWorkflowTemplate({
                        created: '',
                        createdBy: '',
                        id: '',
                        isPublished: false,
                        steps: [],
                        lastModified: null,
                        lastModifiedBy: null,
                    })
                }
            >
                Create new template
            </Button>
            {selectedWorkflowTemplate && (
                <VisualEditor<Step>
                    buttons={[PublishButton, CreateButton, SaveButton]}
                    items={selectedWorkflowTemplate?.steps}
                    newItemFunction={() => {
                        return { id: '', name: 'new step', order: 2 };
                    }}
                    viewKey={'name'}
                />
            )}
        </>
    );
};

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const TemplatePublished = styled.div`
    display: flex;
    flex-direction: column;
`;
