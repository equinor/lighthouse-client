import { useFilteredData } from '../../../../components/Filter';
import { Tree } from '../../../../components/ParkView/Components/Tree';
import { useDataContext } from '../Context/DataProvider';

export const TreeTab = (): JSX.Element => {
    const { data } = useFilteredData();
    const { treeOptions } = useDataContext();
    return <Tree data={data} treeOptions={treeOptions} />;
};
