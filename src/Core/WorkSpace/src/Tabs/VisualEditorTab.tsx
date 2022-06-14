import { useDataContext } from '../Context/DataProvider';
import { TabProps } from './tabProps';

export const VisualEditorTab = ({ isActive }: TabProps): JSX.Element => {
    const { workflowEditorOptions } = useDataContext();

    return <>{workflowEditorOptions?.endpoint}</>;
};
