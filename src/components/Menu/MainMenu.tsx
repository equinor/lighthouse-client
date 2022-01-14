import { Manifests } from '@equinor/app-builder';
import { Accordion, Popover, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Apps } from '../../apps/apps';
import useClientContext from '../../context/clientContext';
import { isProduction } from '../../Core/AppBuilder/Utils/isProduction';
import { AddMenu } from '../../Core/DataFactory';
import Icon from '../Icon/Icon';

const { Item, Header, Panel } = Accordion;

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
    background: ${tokens.colors.ui.background__light.rgba};
    z-index: 1;
    width: ${({ panelActive }: AppsPanelWrapperProps) => (panelActive ? '350px' : '55px')};

    .heading {
        background-color: transparent;
        :hover {
            ::before {
                content: ' ';
                display: block;
                background: ${tokens.colors.interactive.focus.rgba};
                position: absolute;
                left: 0;

                width: 6px;
                height: 48px;
                transition: height 0.3s ease;
            }
        }
        ::before {
            height: 0px;
            content: ' ';
        }
    }

    .noBorder {
        border: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
        min-height: 0px;
        background-color: transparent;

        p {
            padding-left: 1rem;
        }
        svg {
            padding: 1rem;
            padding-left: 0px;
        }

        .link {
            color: #030303;
            text-decoration: none;
            display: block;
            padding-bottom: 0.5rem;
            padding-top: 0.5rem;
            padding-left: 2.5rem;
            :hover {
                opacity: 0.5;
            }
        }
    }
`;

interface TopItemsProps {
    topDivider: boolean;
    bottomDivider: boolean;
}

const TopItems = styled.div`
    padding-left: 1rem;
    border-top: ${({ topDivider }: TopItemsProps) => (topDivider ? `1px solid #EFEFEF` : 'none')};
    border-bottom: ${({ bottomDivider }: TopItemsProps) =>
        bottomDivider ? `1px solid #EFEFEF` : 'none'};

    .link {
        color: #030303;
        text-decoration: none;
        display: block;
        padding-bottom: 0.5rem;
        display: flex;
        align-items: center;
        :hover {
            opacity: 0.5;
        }
    }
    svg {
        padding: 1rem;
        padding-left: 0px;
    }
`;

const SearchWrapper = styled.div`
    padding: 1rem;
`;
const SmallItem = styled.div`
    :hover {
        background-color: ${tokens.colors.ui.background__light.rgba};
    }
`;

const Title = styled.div`
    font-weight: 800;
`;

const Content = styled.div`
    .link {
        color: #030303;
        text-decoration: none;
        display: block;
        padding-bottom: 1rem;
        font-size: 14px;

        :hover {
            opacity: 0.5;
        }
    }
`;

const SmallButton = styled.h2`
    height: 48px;
    margin: 0;
    border: 0px;
    padding: 0px 16px;
    cursor: pointer;
`;
const PopoverWrapper = styled.span`
    > div > button {
        display: none !important;
    }
`;

const GroupLink = styled(Link)`
    text-decoration: none;
    color: #030303;
    flex-grow: 1;
`;

interface MainMenuProps {
    manifests: Manifests;
}

export const MainMenu = ({ manifests }: MainMenuProps): JSX.Element => {
    const isProd = isProduction();
    const { apps, appGroups } = manifests;
    const { appsPanelActive } = useClientContext();
    const [searchValue, setSearchValue] = useState('');
    // const navigate = useNavigate();
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

    const anchorRef = useRef<HTMLHeadingElement[]>([]);
    const addMenuRef = useRef<HTMLHeadingElement>(null);

    const [isOpen, setIsOpen] = useState<string>('');
    const openPopover = (type: string) => setIsOpen(type);
    const closePopover = () => setIsOpen('');
    const handleClose = () => {
        closePopover();
    };

    const filteredList = filterByValue(GroupedMenu, searchValue, 'title');
    const isExpanded = searchValue.length > 1 ? true : false;
    return (
        <Wrapper panelActive={appsPanelActive}>
            {appsPanelActive && (
                <SearchWrapper>
                    <Search
                        aria-label="sitewide"
                        id="search-normal"
                        placeholder="Search"
                        onChange={handleOnChange}
                    />
                </SearchWrapper>
            )}
            {/* It's own component */}
            <TopItems topDivider={appsPanelActive} bottomDivider={!!filteredList[Apps.Top]}>
                {/* {appsPanelActive && <Divider />} */}
                {filteredList[Apps.Top] &&
                    filteredList[Apps.Top].map((item) => {
                        const CustomIcon = item.icon;
                        return (
                            <Link
                                className="link"
                                key={`link-${item.shortName}`}
                                to={`/${item.shortName}`}
                                title={!item.isProduction && isProd ? 'Disabled' : item.title}
                                style={item.isProduction && !isProd ? { color: '#e3e3e3' } : {}}
                            >
                                {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}

                                {CustomIcon && typeof CustomIcon === 'string' && (
                                    <Icon
                                        name={CustomIcon}
                                        title={item.title}
                                        color={tokens.colors.text.static_icons__secondary.rgba}
                                    />
                                )}

                                {appsPanelActive && <span>{item.title}</span>}
                            </Link>
                        );
                    })}
                {/* {filteredList[Apps.Top] && <Divider />} */}
            </TopItems>

            <Accordion chevronPosition="right">
                {Object.keys(filteredList).map((key, i) => {
                    if (key === 'Top') {
                        return null;
                    }

                    const CustomIcon = appGroups[key].icon;
                    if (appsPanelActive)
                        return (
                            <Item key={`item-${key}`} isExpanded={isExpanded}>
                                <Header className="noBorder heading">
                                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}
                                    {CustomIcon && typeof CustomIcon === 'string' && (
                                        <Icon
                                            name={CustomIcon}
                                            title={appGroups[key].name}
                                            color={tokens.colors.text.static_icons__secondary.rgba}
                                        />
                                    )}
                                    <GroupLink to={`${key}`}>{appGroups[key].name}</GroupLink>
                                </Header>
                                <Panel className="noBorder">
                                    {filteredList[key].map((item) => (
                                        <Link
                                            className="link"
                                            key={`link-${item.shortName}`}
                                            to={`${key}/${item.shortName}`}
                                            title={
                                                !item.isProduction && isProd
                                                    ? 'Disabled'
                                                    : item.title
                                            }
                                            style={
                                                !item.isProduction && isProd
                                                    ? { color: '#e3e3e3' }
                                                    : {}
                                            }
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </Panel>
                            </Item>
                        );

                    return (
                        <SmallItem key={`item-${key}`}>
                            <GroupLink to={`${key}`}>
                                <SmallButton
                                    id="hover-popover-anchor"
                                    ref={(el) => (anchorRef.current[i] = el as HTMLHeadingElement)}
                                    className="noBorder heading"
                                    onFocus={() => openPopover(appGroups[key].name)}
                                    onMouseOver={() => openPopover(appGroups[key].name)}
                                    onBlur={handleClose}
                                >
                                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}
                                    {CustomIcon && typeof CustomIcon === 'string' && (
                                        <Icon
                                            name={CustomIcon}
                                            title={appGroups[key].name}
                                            color={tokens.colors.text.static_icons__secondary.rgba}
                                        />
                                    )}
                                </SmallButton>
                            </GroupLink>
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
                                        {filteredList[key].map((item) => (
                                            <Link
                                                className="link"
                                                key={`link-${item.shortName}`}
                                                to={`${key}/${item.shortName}`}
                                                title={
                                                    !item.isProduction && isProd
                                                        ? 'Disabled'
                                                        : item.title
                                                }
                                                style={
                                                    !item.isProduction && isProd
                                                        ? { color: '#e3e3e3' }
                                                        : {}
                                                }
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </Content>
                                </Popover>
                            </PopoverWrapper>
                        </SmallItem>
                    );
                })}
            </Accordion>
            <SmallItem>
                <SmallButton
                    id="add-menu"
                    ref={addMenuRef}
                    className="noBorder heading"
                    onFocus={() => setIsAddMenuOpen((s) => !s)}
                    onMouseOver={() => {
                        handleClose();
                        setIsAddMenuOpen(true);
                    }}
                    onBlur={() => setIsAddMenuOpen(false)}
                >
                    <Icon
                        name={'add'}
                        title={'Add Item'}
                        color={tokens.colors.interactive.primary__resting.hex}
                    />
                </SmallButton>
                <AddMenu
                    anchorEl={addMenuRef.current}
                    isOpen={isAddMenuOpen}
                    handleClose={() => setIsAddMenuOpen(false)}
                    onMouseEnter={() => setIsAddMenuOpen(true)}
                />
            </SmallItem>
        </Wrapper>
    );
};

function filterByValue<T, K extends keyof T>(
    list: Record<string, T[]>,
    value: string,
    key: K
): Record<string, T[]> {
    let filteredList: Record<string, T[]> = {};
    Object.keys(list).forEach((listKey) => {
        if (listKey.toLowerCase().includes(value.toLowerCase())) {
            filteredList = { ...filteredList, [listKey]: list[listKey] };
        } else {
            const filteredItems = list[listKey].filter((item) => {
                if (value === '') return true;
                const valueInKey = item[key];
                let hasValue = false;
                if (typeof valueInKey === 'string') {
                    hasValue = valueInKey.toLowerCase().includes(value.toLowerCase());
                }
                if (!hasValue) hasValue = objectContainsValue(item, value);
                return hasValue;
            });
            if (filteredItems.length > 0) {
                filteredList = { ...filteredList, [listKey]: filteredItems };
            }
        }
    });
    return filteredList;
}

function objectContainsValue<T>(object: T, value: string): boolean {
    let contains = false;
    Object.keys(object).map((key) => {
        const item = object[key];
        if (Array.isArray(item) && item.length > 0) {
            if (typeof item[0] === 'string') {
                contains = item.reduce((hasItem: boolean, item: string) => {
                    if (hasItem) return hasItem;
                    hasItem = item.toLowerCase().includes(value.toLowerCase());
                    return hasItem;
                }, false);
            }
        }
    });
    return contains;
}

function groupeByKey<T, K extends keyof T>(list: T[], key: K) {
    return list.reduce((acc: Record<string, T[]>, item: T) => {
        if (Array.isArray(item[`${key}`])) {
            item[`${key}`].forEach((groupeKey) => {
                acc[groupeKey] = acc[groupeKey] || [];
                acc[groupeKey].push(item);
            });
        } else {
            acc[item[`${key}`]] = acc[item[`${key}`]] || [];
            acc[item[`${key}`]].push(item);
        }
        return acc;
    }, {} as Record<string, T[]>);
}
