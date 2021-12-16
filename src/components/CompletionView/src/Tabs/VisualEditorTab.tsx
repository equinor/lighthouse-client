import { useDataContext } from '../Context/DataProvider';
import { WorkflowEditor } from '../../../WorkflowEditor/Components/WorkflowEditor';

export const VisualEditorTab = (): JSX.Element => {
    const { workflowEditorOptions } = useDataContext();

    return (
        <>
            {workflowEditorOptions ? (
                <WorkflowEditor options={workflowEditorOptions} />
            ) : (
                <p>No options configured</p>
            )}
        </>
    );
};
