import { Tabs } from "@equinor/eds-core-react"
import React, { useState } from "react"
import styled from "styled-components"
import { PowerBI } from "../../../../modules/powerBI"
import { ListView } from "../../../DataView/DataView"
import { Filter } from "../../../Filter/Index"

const { Tab, List, Panels, Panel } = Tabs

const CompletionViewWarper = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const PanelWrapper = styled.div`
    height: calc(100vh - 230px);
    width: calc(100vw - 360px);
    overflow: scroll;
`;


const TreeTab = () => {

    return (
        <h1>Tree</h1>
    );
}

const ListTab = () => {

    return (
        <ListView />
    );
}
const GardenTab = () => {
    return (
        <Filter />
    );
}
const AnalyticsTab = () => {
    return (
        <PowerBI />
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
        viewComponent: TreeTab,
    },
    {
        title: "List",
        icon: "list",
        viewComponent: ListTab,
    },
    {
        title: "Garden",
        icon: "garden",
        viewComponent: GardenTab,

    },
    {
        title: "Timeline",
        icon: "timeline",
        viewComponent: TimelineTab,

    },
    {
        title: "Analytics",
        icon: "Analytics",
        viewComponent: AnalyticsTab,

    },

]

export const CompletionViewTabs = () => {

    const [activeTab, setActiveTab] = useState(0);

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
                            const ViewComponent = tab.viewComponent;
                            return (<Panel key={`panel-${tab.title}`}>
                                <PanelWrapper>
                                    {activeTab == index && <ViewComponent />}
                                </PanelWrapper>
                            </Panel>);
                        })
                    }
                </Panels>

            </Tabs>
        </CompletionViewWarper>
    )
}

