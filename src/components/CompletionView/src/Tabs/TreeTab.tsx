import { TreeRoot } from "../../../../../packages/components/NavigationView/Root";
import { useDataContext } from "../Context/DataProvider";

export const TreeTab = () => {


    const { data, treeOptions } = useDataContext();
    console.log("treeOptions___>", treeOptions)

    return (

        <>
            {
                treeOptions ? <TreeRoot data={data} rootNode={treeOptions.rootNode} groupByKeys={treeOptions.groupByKeys} /> : null
            }
        </>

    );
}

