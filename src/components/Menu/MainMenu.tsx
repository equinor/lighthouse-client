import { Accordion, Divider, Popover, Search } from "@equinor/eds-core-react"
import { tokens } from "@equinor/eds-tokens"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { appGroups, apps, Apps } from "../../apps/apps"
import useClientContext from "../../context/clientContext"
import Icon from "../Icon/Icon"



const { Item, Header, Panel } = Accordion

interface AppsPanelWrapperProps {
    panelActive: boolean;
}

const Wrapper = styled.div`
    overflow-y: auto;
    height: calc(100vh - 64px); 
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #efefef;
    padding: 8px;
    transition: all 0.2s ease;
    background: #ffffff;
    z-index: 1;
    width:  ${({ panelActive }: AppsPanelWrapperProps) => panelActive ? "350px" : "55px"};
    
    .heading {
        
        :hover{
        ::before {
            content: " ";
            display: block;
            background:${tokens.colors.interactive.focus.rgba};
            position: absolute;
            left: 0;
            
            
            width: 6px;
            height: 48px;
            transition: height .3s ease;
        }
    }
        ::before {
            height: 0px;
            content: " ";
        }
  
    }

   .noBorder {
        border: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        min-height: 0px;

   
        p {
            padding-left: 1rem;
        }
        svg {
            padding: 1rem;
            padding-left: 0px;
        }
        
        .link{
            color: #030303;
            text-decoration: none;
            display: block;
            padding-bottom:1rem;
            padding-left: 2.5rem;
            :hover{
                opacity: .5;
          
            }
           
        }
    }
    
`

const TopItems = styled.div`
    padding-left: 1rem;
 
    
    .link{
            color: #030303;
            text-decoration: none;
            display: block;
            padding-bottom:.5rem;
            display: flex;
            align-items: center;
            :hover{
                opacity: .5;
            }
        }
    svg {
            padding: 1rem;
            padding-left: 0px;
        }
`

const SearchWrapper = styled.div`
    padding: 1rem;
`
const SmallItem = styled.div`
 :hover{
        background-color: ${tokens.colors.ui.background__light.rgba};
    }
`;

const Title = styled.div`
font-weight: 800;
`;

const Content = styled.div`
    .link{
            color: #030303;
            text-decoration: none;
            display: block;
            padding-bottom:1rem;            
            :hover{
                opacity: .5;
          
            }
           
        }
`;

const SmallButton = styled.h2`
    height: 48px;
    margin: 0;
    border: 0px;
    padding: 0px 16px;
    cursor: pointer;

`
const PopoverWrapper = styled.span`

    > div > button  {
        display: none !important;
    }
`

export const MainMenu = (): JSX.Element => {
    const { appsPanelActive } = useClientContext()
    const [searchValue, setSearchValue] = useState("");

    const handleOnChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value
        setSearchValue(value)
    }

    const anchorRef = useRef<HTMLHeadingElement[]>([])

    const [isOpen, setIsOpen] = useState<string>("")
    const openPopover = (type: string) => setIsOpen(type)
    const closePopover = () => setIsOpen("")
    const handleClose = () => {

        closePopover()
    }

    const filteredList = filterByValue(GroupedMenu, searchValue, "title");
    const isExpanded = searchValue.length > 1 ? true : false;
    return (
        <Wrapper panelActive={appsPanelActive}>
            {appsPanelActive && <SearchWrapper>
                <Search

                    aria-label="sitewide"
                    id="search-normal"
                    placeholder="Search"
                    onChange={handleOnChange}
                />
            </SearchWrapper>}
            {/* It's own component */}
            <TopItems>
                {appsPanelActive && <Divider />}
                {filteredList[Apps.Top] && filteredList[Apps.Top].map(item => {
                    const CustomIcon = item.icon;
                    return (
                        <Link className="link" key={`link-${item.shortName}`} to={`/${item.shortName}`} >
                            {CustomIcon && typeof CustomIcon !== "string" && <CustomIcon />}

                            {CustomIcon && typeof CustomIcon === "string" && < Icon name={CustomIcon} title={item.title} color={tokens.colors.text.static_icons__secondary.rgba} />}

                            {appsPanelActive && <span>{item.title}</span>}
                        </Link>)

                })
                }
                {filteredList[Apps.Top] && <Divider />}

            </TopItems>

            <Accordion chevronPosition="right">
                {
                    Object.keys(filteredList).map((key, i) => {
                        if (key === "Top") {
                            return null
                        }

                        const CustomIcon = appGroups[key].icon;
                        if (appsPanelActive) return (



                            <Item key={`item-${key}`} isExpanded={isExpanded} >
                                <Header className="noBorder heading">
                                    {CustomIcon && typeof CustomIcon !== "string" && <CustomIcon />}

                                    {CustomIcon && typeof CustomIcon === "string" && < Icon name={CustomIcon} title={appGroups[key].name} color={tokens.colors.text.static_icons__secondary.rgba} />}

                                    {appGroups[key].name}
                                </Header>
                                <Panel className="noBorder">
                                    {filteredList[key].map(item => (
                                        <Link className="link" key={`link-${item.shortName}`} to={`/${item.shortName}`} >
                                            {item.title}
                                        </Link>
                                    ))}
                                </Panel>
                            </Item>
                        )

                        return (
                            <SmallItem>
                                < SmallButton id="hover-popover-anchor" ref={el => anchorRef.current[i] = el as HTMLHeadingElement} className="noBorder heading" onFocus={() => openPopover(appGroups[key].name)} onMouseOver={() => openPopover(appGroups[key].name)}
                                    onBlur={handleClose}>
                                    {CustomIcon && typeof CustomIcon !== "string" && <CustomIcon />}
                                    {CustomIcon && typeof CustomIcon === "string" && < Icon name={CustomIcon} title={appGroups[key].name} color={tokens.colors.text.static_icons__secondary.rgba} />}

                                </SmallButton>
                                <PopoverWrapper>
                                    <Popover
                                        anchorEl={anchorRef.current[i]}
                                        aria-controls="hover-popover"
                                        onClose={handleClose}
                                        open={isOpen === appGroups[key].name}
                                        placement="right-start"
                                        onMouseLeave={handleClose}

                                    >
                                        <Title> {appGroups[key].name}</Title>
                                        <Content>
                                            {filteredList[key].map(item => (
                                                <Link className="link" key={`link-${item.shortName}`} to={`/${item.shortName}`} >
                                                    {item.title}
                                                </Link>))}
                                        </Content>
                                    </Popover>
                                </PopoverWrapper>
                            </SmallItem>
                        )

                    })

                }
            </Accordion >

        </Wrapper >
    )
}


const GroupedMenu = groupeByKey(apps, "groupe")

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


function objectContainsValue<T>(object: T, value: string): boolean {
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
        if (Array.isArray(item[`${key}`])) {
            item[`${key}`].forEach(groupeKey => {
                acc[groupeKey] = acc[groupeKey] || [];
                acc[groupeKey].push(item);
            });
        } else {
            acc[item[`${key}`]] = acc[item[`${key}`]] || [];
            acc[item[`${key}`]].push(item);
        }
        return acc;
    }, {} as Record<string, T[]>)

}
