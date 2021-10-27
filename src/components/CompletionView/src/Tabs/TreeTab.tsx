import { TreeRoot } from "../../../../../packages/components/NavigationView/Root";
import { useFilteredData } from "../../../Filter";

interface Checklist {
    Area__Id: string;
    CommPhase__Id: string;
    CommPkgNo: string;
    CommPriority1__Id: string;
    CommPriority2__Id: string;
    CommPriority3__Id: string;
    CommissioningHandoverStatus: number
    Description: string;
    Id: number
    McStatus__Id: string;
    OperationHandoverStatus: string;
    PlannedCompleted: string;
    PlannedStartup: string;
    Responsible__Id: string;
    Status__Id: string;
}

export const TreeTab = () => {

    const data = useFilteredData<Checklist>()

    return (
        <TreeRoot<Checklist> data={data} rootNode={"CommPhase__Id"} groupByKeys={["Status__Id", "CommPkgNo"]} />
    );
}

