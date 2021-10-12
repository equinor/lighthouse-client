import { Tabs } from "@equinor/eds-core-react"
import React, { useState } from "react"
import styled from "styled-components"
const { Tab, List, Panels, Panel } = Tabs

const CompletionViewWarper = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`


const TreeTab = () => {
    return (
        <h1>Tree</h1>
    );
}

const ListTab = () => {
    return (
        <h1>List</h1>
    );
}
const GardenTab = () => {
    return (
        <h1>Garden</h1>
    );
}
const AnalyticsTab = () => {
    return (
        <h1>Analytics</h1>
    );
}
const TimelineTab = () => {
    return (
        <h1>TimeLine</h1>
    );
}

const tabs = [
    {
        title: "Tree",
        icon: "tree",
        component: TreeTab,
        data: {}
    },
    {
        title: "List",
        icon: "list",
        component: ListTab,
        data: {}
    },
    {
        title: "Garden",
        icon: "garden",
        component: GardenTab,
        data: {}
    },
    {
        title: "Timeline",
        icon: "timeline",
        component: TimelineTab,
        data: {}
    },
    {
        title: "Analytics",
        icon: "Analytics",
        component: AnalyticsTab,
        data: {}
    },

]

export const CompletionViewTabs = () => {

    const [activeTab, setActiveTab] = useState(0)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }
    return (
        <CompletionViewWarper>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <List>
                    {tabs.map(tab => <Tab key={`tab-${tab.title}`}>{tab.title}</Tab>)}
                </List>

                <Panels>
                    {
                        tabs.map((tab, index) => {
                            const Component = tab.component;
                            return (<Panel key={`panel-${tab.title}`}>
                                {activeTab == index && <Component {...tab.data} />}
                            </Panel>);
                        })
                    }
                </Panels>
            </Tabs>
        </CompletionViewWarper>
    )
}