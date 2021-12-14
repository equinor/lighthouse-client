import { useDataContext } from '../Context/DataProvider';
import { WorkflowEditor } from '../../../WorkflowEditor/Components/WorkflowEditor';

export const VisualEditorTab = (): JSX.Element => {
    const { visualEditorOptions } = useDataContext();

    return (
        <>
            {visualEditorOptions ? (
                <WorkflowEditor options={visualEditorOptions} />
            ) : (
                <p>No options configured</p>
            )}
        </>
    );
};
