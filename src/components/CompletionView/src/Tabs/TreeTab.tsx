import { useFilteredData } from '@equinor/filter';
import { Tree } from '../../../ParkView/Components/Tree';
import { useDataContext } from '../Context/DataProvider';

export const TreeTab = (): JSX.Element => {
    const { data } = useFilteredData();
    const { treeOptions } = useDataContext();

    return <Tree data={data} treeOptions={treeOptions} />;
};
