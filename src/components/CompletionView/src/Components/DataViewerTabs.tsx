import { Tabs } from "@equinor/eds-core-react";
import styled from "styled-components";


const { Panels, Panel } = Tabs

const PanelsView = styled(Panels)`
    overflow: auto;
`

export const CompletionViewTabs = ({ tabs, activeTab, handleChange }) => {

    return (

        <PanelsView >
            {
                tabs.map((tab, index) => {
                    const ViewComponent = tab.viewComponent;
                    return (<Panel key={`panel-${tab.title}`} style={{ paddingTop: 0 }}>
                        {activeTab == index && <ViewComponent />}
                    </Panel>);
                })
            }
        </PanelsView>
    )


}

