import { Tabs } from "@equinor/eds-core-react"
import { useState } from "react"
import styled from "styled-components"
import { FilterView } from "../../../Filter"
import { FilterProvider } from "../../../Filter/Context/FilterProvider"
import { useDataContext } from "../Context/DataProvider"
import { tabsConfig } from "../Tabs/tabsConfig"
import { CompletionViewHeader } from "./DataViewerHeader"
import { CompletionViewTabs } from "./DataViewerTabs"


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

const checklist: (keyof Checklist)[] = ["Id", "CommPriority1__Id", "CommPkgNo", "Description", "PlannedStartup"]
const wo: (keyof WorkOrder)[] = ["WoNo", "DescriptionShort"]

const CompletionViewWarper = styled.section`

`
export const DataViewer = (props) => {
    const { data } = useDataContext();
    const [activeTab, setActiveTab] = useState(0);
    const [activeFilter, setActiveFilter] = useState(false);

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    function handleFilter() {
        setActiveFilter(state => !state)
    }

    return (

        <FilterProvider<Checklist> initialData={data} options={{
            excludeKeys: checklist,
            typeMap: {
                Responsible__Id: "Responsible Id",
            },
            groupValue: {
                start: (item: Checklist) => {
                    switch (new Date(item.PlannedStartup).getMonth()) {
                        case 0:
                            return "January";
                        case 1:
                            return "February";
                        case 2:
                            return "March";
                        case 3:
                            return "April";
                        case 4:
                            return "May";
                        case 5:
                            return "June";
                        case 6:
                            return "July";
                        case 7:
                            return "August";
                        case 8:
                            return "September";
                        case 9:
                            return "October";
                        case 10:
                            return "November";
                        case 11:
                            return "December"
                        default:
                            return "Unknown"
                    }
                }
            }
        }
        } >
            {activeFilter && <FilterView />}
            <Tabs activeTab={activeTab} onChange={handleChange} >
                <CompletionViewHeader {...props} tabs={tabsConfig} handleFilter={handleFilter} />
                <CompletionViewTabs tabs={tabsConfig} activeTab={activeTab} handleChange={handleChange} />
            </Tabs>
        </FilterProvider>

    );
}