import { FilterView } from '@equinor/filter';
import { Tree } from '../../../../components/ParkView/Components/Tree';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { useDataContext } from '../Context/DataProvider';
import { useViewerContext } from '../Context/ViewProvider';

export const TreeTab = (): JSX.Element => {
    const { treeOptions } = useDataContext();
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    const { isFilterActive } = useViewerContext();
    return (
        <>
            <FilterView isActive={isFilterActive} />
            <Tree data={data} treeOptions={treeOptions} />;
        </>
    );
};
