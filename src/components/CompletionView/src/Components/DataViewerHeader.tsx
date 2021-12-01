import { Breadcrumbs, Tabs, Typography } from "@equinor/eds-core-react";
import { StatusBar } from "@equinor/StatusBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilteredData } from "../../../Filter";
import Icon from "../../../Icon/Icon";
import { useDataContext } from "../Context/DataProvider";
import { TabButton } from "./ToggleButton";



const { Tab, List } = Tabs
const { Breadcrumb } = Breadcrumbs;

const HeaderWrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;   
`

const LeftSection = styled.div`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: -webkit-fill-available;
    border-bottom: 2px solid var(--eds_ui_background__medium,rgba(220,220,220,1));
`
const RightSection = styled.div`
    display: flex;
    flex-direction: row;
`


const Title = styled(Typography)`
    padding: 1rem;
`

const Divider = styled.div`
 padding: 0.5rem;
 border-bottom: 2px solid var(--eds_ui_background__medium,rgba(220,220,220,1));
 
 ::before {
    content: " ";
    display: block;
    width: 2px;
    height: 30px;
    background: var(--eds_ui_background__medium,rgba(220,220,220,1));
 }
`

/**
 * Implementation Speck
 *  - [] Make the Breadcrumbs according to Router location and mak it clickable to navigate.
 *  - [] Make a dropdown for selection data set to view.
 *  - [] Add Filter Section, maybe need to be its own section and component.
 */


const items = [
    "Checklist",
    "Handover",
    "Heat trace installation",
    "Loop",
    "N2He",
    "Punch",
    "Swcr"

]

const TabTitle = styled.span`
    padding-left: .5rem;
    font-size: .8rem;
`;



export const CompletionViewHeader = ({ groupe, title, tabs, handleFilter, activeFilter }) => {
    const { getData, statusFunc } = useDataContext();
    const { data } = useFilteredData()

    useEffect(() => {
        getData();
    }, [])

    const [selectedDataSet, setSelectedDataSet] = useState("Commissioning packages")
    function handleClick() {
        console.log("click")
    }

    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{title}</Title>
                {statusFunc && <StatusBar data={statusFunc(data)} />}
            </LeftSection>
            <RightSection>
                <List>
                    {
                        tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <Tab key={`tab-${tab.icon}`}>
                                    <Icon />
                                    <TabTitle>
                                        {tab.title}
                                    </TabTitle>
                                </Tab>)
                        })
                    }
                </List>
                <Divider />
                <TabButton onClick={handleFilter} aria-selected={activeFilter}>
                    <Icon name={"filter_alt"} />
                </TabButton>
            </RightSection>

        </HeaderWrapper>
    )
}