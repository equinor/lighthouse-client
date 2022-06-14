import { Tree } from '../../../../components/ParkView/Components/Tree';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { useDataContext } from '../Context/DataProvider';
import { TabProps } from './tabProps';

export const TreeTab = ({ isActive }: TabProps): JSX.Element => {
    const { treeOptions } = useDataContext();
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();

    return (
        <>
            <WorkspaceFilter />
            <Tree data={data} treeOptions={treeOptions} />;
        </>
    );
};
