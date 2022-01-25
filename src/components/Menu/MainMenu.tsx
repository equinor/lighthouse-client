import { Accordion, Popover, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { isProduction, useClientContext } from '@equinor/portal-client';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Apps } from '../../apps/apps';
import { AddMenu } from '../../Core/DataFactory';
import Icon from '../Icon/Icon';
import {
    Content,
    GroupLink,
    MenuItem,
    MenuItems,
    MenuItemText,
    MenuWrapper,
    PopoverWrapper,
    SearchWrapper,
    SmallButton,
    SmallItem,
    Title,
    TopItems
} from './Styles';
import { filterByValue, groupeByKey } from './utils';

const { Item, Header, Panel } = Accordion;

export const MainMenu = (): JSX.Element => {
    const isProd = isProduction();
    const {
        settings: { appsPanelActive },
        registry,
        toggleAppPanel,
        toggleFullscreenMenu,
    } = useClientContext();
    const { apps, appGroups } = registry;
    const [searchValue, setSearchValue] = useState('');
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
        <MenuWrapper panelActive={appsPanelActive}>
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
            <MenuItems>
                <MenuItem
                    onClick={() => (appsPanelActive ? toggleAppPanel() : null)}
                    style={{ cursor: appsPanelActive ? 'pointer' : 'default' }}
                >
                    <Icon
                        color={tokens.colors.interactive.primary__resting.hex}
                        name="more_vertical"
                    />
                    {appsPanelActive && <MenuItemText>Minimized</MenuItemText>}
                </MenuItem>
                <MenuItem
                    onClick={() => (!appsPanelActive ? toggleAppPanel() : null)}
                    style={{ cursor: appsPanelActive ? 'default' : 'pointer' }}
                >
                    <Icon color={tokens.colors.interactive.primary__resting.hex} name="menu" />
                    {appsPanelActive && (
                        <MenuItemText disabled={appsPanelActive ? true : false}>
                            Standard
                        </MenuItemText>
                    )}
                </MenuItem>
                <MenuItem onClick={() => toggleFullscreenMenu()} style={{ cursor: 'pointer' }}>
                    <Icon
                        color={tokens.colors.interactive.primary__resting.hex}
                        name="fullscreen"
                    />
                    {appsPanelActive && <MenuItemText>Expand all</MenuItemText>}
                </MenuItem>
            </MenuItems>
        </MenuWrapper>
    );
};
