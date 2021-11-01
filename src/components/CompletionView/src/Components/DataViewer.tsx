
import { Tabs } from "@equinor/eds-core-react"
import { useState } from "react"
import styled from "styled-components"
import { FilterView } from "../../../Filter"
import { FilterProvider } from "../../../Filter/Context/FilterProvider"
import { useDataContext } from "../Context/DataProvider"
import { useDataViewer } from "../DataViewerApi/useDataViewer"
import { useConfiguredTabs } from "../Tabs/tabsConfig"
import { CompletionViewHeader } from "./DataViewerHeader"
import { CompletionViewTabs } from "./DataViewerTabs"
import { DataView } from "./DeraultDataView"
import { useDataViewerKey } from "./DeraultDataView/Hooks/useDataViewerKey"


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



type DataTypes = Checklist | WorkOrder


function getDataType<T = DataTypes>(data: any[]): T[] {
    return []
}


export const DataViewer = (props) => {
    const viewerId = useDataViewerKey()
    const { treeOptions, tableOptions, gardenOptions, timelineOptions, analyticsOptions, powerBiOptions, name } = useDataViewer();
    const { data } = useDataContext()

    const { tabs, viewIsActive } = useConfiguredTabs(treeOptions, tableOptions, gardenOptions, timelineOptions, analyticsOptions, powerBiOptions)
    const [activeTab, setActiveTab] = useState(0);
    const [activeFilter, setActiveFilter] = useState(false);

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    function handleFilter() {
        setActiveFilter(state => !state)
    }

    return (

        viewIsActive ? <FilterProvider initialData={data} options={{
            excludeKeys: checklist,
            typeMap: {
                Responsible__Id: "Responsible Id",
                Area__Id: "Area",
                McStatus__Id: "Mc Status"
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
                },
            }
        }
        } >
            <Tabs activeTab={activeTab} onChange={handleChange} >
                <CompletionViewHeader {...props} tabs={tabs} handleFilter={handleFilter} />
                {activeFilter && <FilterView />}
                <CompletionViewTabs tabs={tabs} activeTab={activeTab} handleChange={handleChange} />
            </Tabs>
            <DataView />
        </FilterProvider>
            :
            <div>
                <h1>No data viewer is configured for {viewerId}</h1>
                <p>{name}</p>

            </div>

    );
}