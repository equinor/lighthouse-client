import { useFilter } from '../../../Filter/Hooks/useFilter';
import { Tree } from '../../../ParkView/Components/Tree';
import { useDataContext } from '../Context/DataProvider';

export const TreeTab = (): JSX.Element => {
    const { filteredData } = useFilter();
    const { treeOptions } = useDataContext();

    return <Tree data={filteredData} treeOptions={treeOptions} />;
};
