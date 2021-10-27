import { Tabs } from "@equinor/eds-core-react";
import styled from "styled-components";

const { Panels, Panel } = Tabs

const CompletionViewWarper = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const PanelWrapper = styled.section`
    overflow: scroll;
`;

export const CompletionViewTabs = ({ tabs, activeTab, handleChange }) => {

    return (
        <PanelWrapper>
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

        </PanelWrapper>

    )
}

