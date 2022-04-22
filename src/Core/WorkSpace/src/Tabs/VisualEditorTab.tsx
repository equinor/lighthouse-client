import { useDataContext } from '../Context/DataProvider';

export const VisualEditorTab = (): JSX.Element => {
    const { workflowEditorOptions } = useDataContext();

    return <>{workflowEditorOptions?.endpoint}</>;
};
