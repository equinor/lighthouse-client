import { Accordion, Menu, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { isAppActive, useClientContext } from '@equinor/portal-client';
import { useMemo, useRef, useState } from 'react';
import { AddMenu } from '../../Core/DataFactory';
import { PopoutSidesheet } from '../../packages/Sidesheet/Components/PopoutSidesheet';
import Icon from '../Icon/Icon';
import { AccordionHeader, AccordionHeaderTitle, AccordionPanel } from './MainMenuExpandedStyles';
import { MenuItemTitleLink } from './MainMenuStyles';
import { MenuItem } from './MenuItem';
import {
    GroupLink,
    LinkIcon,
    LinkIconWrapper,
    MenuWrapper,
    PopoverWrapper,
    SearchWrapper,
    SmallItem,
    Title,
} from './Styles';
import { filterByValue, groupeByKey } from './utils';

const { Item } = Accordion;

export const MainMenu = (): JSX.Element => {
    // const isProd = isProduction();
    const {
        settings: { appsPanelActive },
        registry,
        // toggleAppPanel,
    } = useClientContext();
    const { apps, appGroups } = registry;
    const [searchValue, setSearchValue] = useState('');
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    const GroupedMenu = useMemo(
        () =>
            groupeByKey(
                apps.filter((a) => isAppActive(a)),
                'groupe'
            ),
        [apps]
    );

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

            {/* <TopItems apps={filteredList} openPopover={openPopover} isExpanded={appsPanelActive} /> */}

            <Accordion chevronPosition="right">
                {Object.keys(filteredList).map((key, i) => {
                    if (key === 'Top') {
                        return null;
                    }
                    const isActive = location.pathname.includes(key);
                    const CustomIcon = appGroups[key].icon;

                    if (appsPanelActive)
                        return (
                            <Item key={`item-${key}`} isExpanded={isExpanded}>
                                <AccordionHeader>
                                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}
                                    {CustomIcon && typeof CustomIcon === 'string' && (
                                        <Icon
                                            name={CustomIcon}
                                            title={appGroups[key].name}
                                            color={tokens.colors.text.static_icons__secondary.rgba}
                                        />
                                    )}
                                    <AccordionHeaderTitle to={`${key}`}>
                                        {appGroups[key].name}
                                    </AccordionHeaderTitle>
                                </AccordionHeader>
                                <AccordionPanel>
                                    {filteredList[key].map((manifest) => (
                                        <MenuItem
                                            key={`acc-${manifest.shortName}`}
                                            appId={key}
                                            manifest={manifest}
                                        />
                                    ))}
                                </AccordionPanel>
                            </Item>
                        );

                    return (
                        <SmallItem key={`item-${key}`}>
                            <GroupLink to={'#'}>
                                <LinkIconWrapper
                                    id="hover-popover-anchor"
                                    ref={(el) => (anchorRef.current[i] = el as HTMLHeadingElement)}
                                    onFocus={() => openPopover(appGroups[key].name)}
                                    onMouseOver={() => {
                                        openPopover(appGroups[key].name);
                                        setIsAddMenuOpen(false);
                                    }}
                                    onBlur={handleClose}
                                    active={isActive}
                                >
                                    <LinkIcon>
                                        {CustomIcon && typeof CustomIcon !== 'string' && (
                                            <CustomIcon />
                                        )}
                                        {CustomIcon && typeof CustomIcon === 'string' && (
                                            <Icon
                                                name={CustomIcon}
                                                title={appGroups[key].name}
                                                color={
                                                    tokens.colors.text.static_icons__secondary.rgba
                                                }
                                            />
                                        )}
                                    </LinkIcon>
                                </LinkIconWrapper>
                            </GroupLink>
                            <PopoverWrapper>
                                <Menu
                                    anchorEl={anchorRef.current[i]}
                                    aria-controls="hover-popover"
                                    onClose={handleClose}
                                    open={isOpen === appGroups[key].name}
                                    placement="right-start"
                                    onMouseLeave={handleClose}
                                >
                                    <MenuItemTitleLink>
                                        <Title> {appGroups[key].name}</Title>
                                    </MenuItemTitleLink>

                                    {filteredList[key].map((manifest) => (
                                        <MenuItem
                                            key={`acc-${manifest.shortName}`}
                                            appId={key}
                                            manifest={manifest}
                                        />
                                    ))}
                                </Menu>
                            </PopoverWrapper>
                        </SmallItem>
                    );
                })}
            </Accordion>
            <PopoutSidesheet />
            <SmallItem>
                <LinkIconWrapper
                    id="add-menu"
                    ref={addMenuRef}
                    onFocus={() => setIsAddMenuOpen((s) => !s)}
                    onMouseOver={() => {
                        handleClose();
                        setIsAddMenuOpen(true);
                    }}
                    onBlur={() => setIsAddMenuOpen(false)}
                    active={false}
                >
                    <LinkIcon>
                        <Icon
                            name={'add'}
                            title={'Add Item'}
                            color={tokens.colors.interactive.primary__resting.hex}
                        />
                    </LinkIcon>
                </LinkIconWrapper>
                <AddMenu
                    anchorEl={addMenuRef.current}
                    isOpen={isAddMenuOpen}
                    handleClose={() => setIsAddMenuOpen(false)}
                    onMouseEnter={() => setIsAddMenuOpen(true)}
                />
            </SmallItem>
        </MenuWrapper>
    );
};
