
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


const CompletionViewWarper = styled.section``;

export const DataViewer = (props) => {
    const viewerId = useDataViewerKey()
    const { treeOptions, tableOptions, gardenOptions, timelineOptions, analyticsOptions, powerBiOptions, name, filterOptions } = useDataViewer();
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

        viewIsActive ? <FilterProvider initialData={data} options={filterOptions} >
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