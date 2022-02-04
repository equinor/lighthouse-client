import { WorkflowEditor } from '../../../../components/WorkflowEditor/Components/WorkflowEditor';
import { useDataContext } from '../Context/DataProvider';

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
