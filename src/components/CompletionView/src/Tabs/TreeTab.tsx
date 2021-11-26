import { TreeRoot } from "../../../../../packages/components/NavigationView/Root";
import { useFilteredData } from "../../../Filter";
import { useDataContext } from "../Context/DataProvider";

export const TreeTab = () => {
    const { treeOptions } = useDataContext();
    const { data } = useFilteredData()
    return (

        <>
            {
                treeOptions ? <TreeRoot data={data} rootNode={treeOptions.rootNode} groupByKeys={treeOptions.groupByKeys} /> : null
            }
        </>

    );
}

