
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
import { DataView } from "./DefaultDataView"
import { NoDataViewer } from "./NoDataViewer"


const DataViewWrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
`;


export const DataViewer = (props) => {
    const { treeOptions, tableOptions, gardenOptions, timelineOptions, analyticsOptions, powerBiOptions, filterOptions } = useDataViewer();
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

    if (!viewIsActive) return (
        <NoDataViewer />
    );


    return (
        <FilterProvider initialData={data} options={filterOptions} >
            <Tabs activeTab={activeTab} onChange={handleChange} >
                <CompletionViewHeader {...props} tabs={tabs} handleFilter={handleFilter} />
                <FilterView isActive={activeFilter} />
                <DataViewWrapper>
                    <CompletionViewTabs tabs={tabs} activeTab={activeTab} handleChange={handleChange} />
                    <DataView />
                </DataViewWrapper>
            </Tabs>
        </FilterProvider>
    );
}