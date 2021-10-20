import { Tabs } from "@equinor/eds-core-react"
import React from "react"
import styled from "styled-components"

const { Panels, Panel } = Tabs

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

export const CompletionViewTabs = ({ tabs, activeTab, handleChange }) => {

    return (


        <Panels>
            {
                tabs.map((tab, index) => {
                    const ViewComponent = tab.viewComponent;
                    return (<Panel key={`panel-${tab.title}`} style={{ paddingTop: 0 }}>
                        {activeTab == index && <ViewComponent />}
                    </Panel>);
                })
            }
        </Panels>


    )
}

