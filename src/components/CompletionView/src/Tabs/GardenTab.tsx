import { useFilteredData } from "../../../Filter";
import { Garden } from "../../../Garden";

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

interface WorkOrder {
    CommPkg__CommPkgNo: string;
    CommPkg__CommPriority1__Id: string;
    CommPkg__CommPriority2__Id: string;
    CommPkg__Description: string;
    DescriptionShort: string;
    Hyperlink_WoNo: string;
    IccMilestone__Id: string;
    IccSubmilestone__Description: string;
    JobStatus__Id: string;
    MaterialStatus__Id: string;
    ProjectProgress: string;
    Project__Name: string;
    RemainingManhours__Sum: string;
    WoEstimates__EstimatedMhrs__Sum: string;
    WoNo: string;
    WoPlannedStartupDate: string;
    WoResponsible__Id: string;
}


export const GardenTab = () => {
    const data = useFilteredData<Checklist>()
    // const history = useHistory();
    // if (history.location.pathname === "/handover") {
    //     return (
    //         <ImageTab imageUri="./images/Handover board view.jpg" />
    //     );
    // }
    // if (history.location.pathname === "/heat-trace") {
    //     return (
    //         <ImageTab imageUri="./images/Heat trace Board view.jpg" />
    //     );
    // }
    return (
        <Garden<Checklist> data={data} groupeKey={"Responsible__Id"} itemKey={"CommPkgNo"} />
    );
}