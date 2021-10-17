import { Accordion, Divider, Search } from "@equinor/eds-core-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const { Item, Header, Panel } = Accordion

const Wrapper = styled.div`
height: calc(100vh - 64px); 
display: flex;
flex-direction: column;
border-right: 1.5px solid #efefef;
padding: 8px;
transition: all 0.2s ease;
background: #ffffff;
z-index: 1;

   .noBorder {
        border: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        min-height: fit-content;

        p {
            padding-left: 1rem;
        }
    }
    .link{
        color: #030303;
        text-decoration: none;
        display: block;
        padding-bottom:1rem;

        :hover{
            opacity: .5;
        }
    }
`

const TopItems = styled.div`
    padding-left: 1rem;
`

const SearchWrapper = styled.div`
    padding: 1rem;
`

export const MainMenu = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleOnChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value
        setSearchValue(value)
    }

    const filteredList = filterByValue(GroupedMenu, searchValue, "title");
    const isExpanded = searchValue.length > 1 ? true : false;
    return (
        <Wrapper>
            <SearchWrapper>
                <Search

                    aria-label="sitewide"
                    id="search-normal"
                    placeholder="Search"
                    onChange={handleOnChange}
                />
            </SearchWrapper>
            <TopItems>
                <Divider />
                {filteredList["Top"].map(item => (<Link className="link" key={`link-${item.shortName}`} to={`/${item.shortName}`} >{item.title}</Link>))}
                <Divider />
            </TopItems>
            <Accordion chevronPosition="right">
                {Object.keys(filteredList).map((key, index) => {
                    if (key === "Top") {
                        return null
                    }
                    return (

                        <Item isExpanded={isExpanded} key={`item-${key}`}>
                            <Header className="noBorder">
                                {key}
                            </Header>
                            <Panel className="noBorder" >
                                {filteredList[key].map(item => (<Link className="link" key={`link-${item.shortName}`} to={`/${item.shortName}`} >{item.title}</Link>))}
                            </Panel>
                        </Item>

                    );
                })
                }
            </Accordion>

        </Wrapper >
    )
}


export const menuList = [
    {
        title: 'Meeting',
        shortName: 'HO',
        color: '#0364B8',
        groupe: "Collaboration",
        tags: []

    },
    {
        title: 'Review',
        shortName: 'CL',
        color: '#28A8EA',
        groupe: "Collaboration",
        tags: ["tag"]
    },
    {
        title: 'Home',
        shortName: 'PU',
        color: '#C43E1C',
        groupe: "Top",
        tags: []
    },
    {
        title: 'Change request',
        shortName: 'PR',
        color: '#21A366',
        groupe: "Scope and Change",
        tags: ["work order"]
    },
    {
        title: 'Project change proposal',
        shortName: 'QU',
        color: '#F7DA60',
        groupe: "Scope and Change",
        tags: ["home", "tag"]
    }

];
const GroupedMenu = groupeByKey(menuList, "groupe")

function filterByValue<T, K extends keyof T>(list: Record<string, T[]>, value: string, key: K): Record<string, T[]> {
    let filteredList: Record<string, T[]> = {};
    Object.keys(list).forEach((listKey) => {
        if (listKey.toLowerCase().includes(value.toLowerCase())) {
            filteredList = { ...filteredList, [listKey]: list[listKey] }
        } else {
            const filteredItems = list[listKey].filter(item => {
                if (value === "") return true;
                const valueInKey = item[key];
                let hasValue = false
                if (typeof valueInKey === "string") {
                    hasValue = valueInKey.toLowerCase().includes(value.toLowerCase())
                }
                if (!hasValue)
                    hasValue = objectContainsValue(item, value)
                return hasValue;

            })
            if (filteredItems.length > 0) {
                filteredList = { ...filteredList, [listKey]: filteredItems }
            }

        }
    });
    return filteredList;
}


function objectContainsValue<T extends Object>(object: T, value: string): boolean {
    let contains = false;
    Object.keys(object).map(key => {
        const item = object[key]
        if (Array.isArray(item) && item.length > 0) {
            if (typeof item[0] === "string") {
                contains = item.reduce((hasItem: boolean, item: string) => {
                    if (hasItem) return hasItem
                    hasItem = item.toLowerCase().includes(value.toLowerCase())
                    return hasItem;
                }, false);
            }

        }
    })
    return contains
};

function groupeByKey<T, K extends keyof T>(list: T[], key: K) {
    return list.reduce((acc: Record<string, T[]>, item: T) => {
        acc[item[`${key}`]] = acc[item[`${key}`]] || [];
        acc[item[`${key}`]].push(item);
        return acc;
    }, {} as Record<string, T[]>)

}
