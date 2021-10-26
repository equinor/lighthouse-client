import { Breadcrumbs, Button, Icon, Tabs } from "@equinor/eds-core-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDataContext } from "../Context/DataProvider";



const { Tab, List, Panels, Panel } = Tabs
const { Breadcrumb } = Breadcrumbs;

const HeaderWrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:;
    
`

const BreadcrumbWrapper = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
`
const ActionWrapper = styled.div`
    padding: .5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const SelectionWrapper = styled.div`
  width: 40%;
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



export const CompletionViewHeader = ({ groupe, title, tabs, handleFilter }) => {
    const { getData } = useDataContext();

    useEffect(() => {
        getData();
    }, [])

    const [selectedDataSet, setSelectedDataSet] = useState("Commissioning packages")
    function handleClick() {
        console.log("click")
    }

    return (
        <HeaderWrapper>
            <BreadcrumbWrapper>
                <Button variant="ghost_icon" onClick={handleFilter}>
                    <Icon name={"filter_list"} />
                </Button>
                <Breadcrumbs>
                    {
                        groupe !== "Top" && <Breadcrumb href="#" onClick={handleClick}>
                            {groupe}
                        </Breadcrumb>
                    }

                    <Breadcrumb
                        href="#"
                        onClick={handleClick}
                        aria-current="page"
                    >
                        {title}
                    </Breadcrumb>

                </Breadcrumbs>
            </BreadcrumbWrapper>
            <List>
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <Tab key={`tab-${tab.icon}`}>
                            <Icon />
                            <TabTitle>
                                {tab.title}
                            </TabTitle>
                        </Tab>)
                }
                )
                }
            </List>
            {/* <ActionWrapper>
                <SelectionWrapper>
                    <SingleSelect
                        value={selectedDataSet}
                        label="Select data set"
                        initialSelectedItem="Commissioning packages"
                        items={items}
                        handleSelectedItemChange={(changes) => setSelectedDataSet(changes.selectedItem || "")}
                    />
                </SelectionWrapper>


                <Button variant="ghost_icon" color="secondary">
                    <Icon name="filter_list" title="filter"></Icon>
                </Button>

            </ActionWrapper> */}
        </HeaderWrapper>
    )
}