import { Chip, Tabs } from "@equinor/eds-core-react";
import { useState } from "react";
import styled from "styled-components";
import { TreeRoot } from ".";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 254px;
    background-color: #ffffff;
    overflow: auto;
    border-right: 2px solid var(--eds_ui_background__light,rgba(247,247,247,1));
    height: calc(100vh - 64px);

    > :last-child {
        border-bottom: 0;
    }
`;

interface SectionProps {
    padding?: string
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    height: fit-content;
    border-bottom: 2px solid var(--eds_ui_background__light,rgba(247,247,247,1));
    padding: ${(props: SectionProps) => (props.padding ? props.padding : "1rem")};
`;



const FilterGroupe = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > div {
    margin: .2rem;
    }
`;

export const NavigationView = () => {

    const handleDelete = () => {
        alert('Deleted')
    }

    const [activeTab, setActiveTab] = useState(0)

    const handleChange = (index: number) => {
        setActiveTab(index)
    }
    return (
        <Tabs activeTab={activeTab} onChange={handleChange}>
            <Wrapper>
                <Section>
                    <label>
                        Groups
                    </label>
                    <FilterGroupe>
                        <Chip onDelete={handleDelete}>
                            System
                        </Chip>
                        <Chip onDelete={handleDelete}>
                            Subsystem
                        </Chip>
                        <Chip onDelete={handleDelete}>
                            Comm Pkg
                        </Chip>
                    </FilterGroupe>
                    <label>
                        Status
                    </label>
                    <FilterGroupe>
                        <Chip onDelete={handleDelete}>
                            RFCC
                        </Chip>
                        <Chip onDelete={handleDelete}>
                            RFOC
                        </Chip>
                    </FilterGroupe>
                </Section>
                <Section padding={"0"}>
                    <Tabs.List>
                        <Tabs.Tab>T1</Tabs.Tab>
                        <Tabs.Tab>T2</Tabs.Tab>
                        <Tabs.Tab >Ta3</Tabs.Tab>
                        <Tabs.Tab>T4</Tabs.Tab>
                    </Tabs.List>

                </Section>
                <Section>
                    <Tabs.Panels>
                        <Tabs.Panel>
                            {activeTab === 0 && <TreeRoot />}
                        </Tabs.Panel>
                        <Tabs.Panel>
                            {activeTab === 1 && <Garden />}
                        </Tabs.Panel>
                        <Tabs.Panel>Panel three</Tabs.Panel>
                        <Tabs.Panel>Panel four</Tabs.Panel>
                    </Tabs.Panels>
                </Section>
            </Wrapper>
        </Tabs >
    )
}