import { Tabs } from "@equinor/eds-core-react"
import { useState } from "react"
import styled from "styled-components"
import { FilterProvider } from "../../../Filter/Context/FilterProvider"
import { Filter } from "../../../Filter/Index"
import { useDataContext } from "../Context/DataProvider"
import { tabsConfig } from "../Tabs/tabsConfig"
import { CompletionViewHeader } from "./DataViewerHeader"
import { CompletionViewTabs } from "./DataViewerTabs"





const CompletionViewWarper = styled.section`

`
export const DataViewer = (props) => {
    const { data } = useDataContext();
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (index: number) => {
        setActiveTab(index)
    }

    return (
        <CompletionViewWarper>
            <FilterProvider data={data} >
                <Filter />
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <CompletionViewHeader {...props} tabs={tabsConfig} />
                    <CompletionViewTabs tabs={tabsConfig} activeTab={activeTab} handleChange={handleChange} />
                </Tabs>
            </FilterProvider>
        </CompletionViewWarper >
    );
}