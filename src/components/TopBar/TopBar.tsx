// import { AddMenu } from '@equinor/DataFactory';
import { BookmarkSidesheet } from '@equinor/BookmarksManager';
import { TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { openSidesheet } from '@equinor/sidesheet';
import { useRef, useState } from 'react';
import { GlobalSearch } from '../../Core/GlobalSearh/Components/GlobalSearch';
import { NotificationBell } from '../../Core/Notifications/Components/NotificationBell';
import { AddMenu } from '../../FusionModules/DataCreatorReact/Components/AddMenu';
import { useDataCreator } from '../../FusionModules/DataCreatorReact/Hooks/useCreator';
import { ClickableIcon } from '../../packages/Components/Icon';
import Icon from '../Icon/Icon';
import { useMenuContext } from '../Menu';
import { LocationBreadCrumbs } from './BreadCrumbs/Breadcrumbs';
import { DevBar } from './DevBar/DevBar';
import { HelpMenu } from './HelpMenu';
import Logo from './Logo/Logo';
import { TopBarAvatar } from './TopBarAvatar';
import { ActionWrapper, Header, Icons, TopBarWrapper } from './TopBarStyle';

const ClientTopBar = (): JSX.Element => {
    // state for open and close add menu and add menu ref for positioning.
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const { creators } = useDataCreator();
    const addMenuRef = useRef<HTMLHeadingElement>(null);

    const {
        settings: { clientEnv },
    } = useClientContext();

    const { toggleMenu } = useMenuContext();

    return (
        <TopBarWrapper>
            <Header>
                <div
                    onClick={() => {
                        toggleMenu();
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <Icon color={tokens.colors.interactive.primary__resting.hex} name="menu" />
                </div>
                <Logo />
                <LocationBreadCrumbs />
            </Header>
            <TopBar.CustomContent>
                <DevBar env={clientEnv} />
            </TopBar.CustomContent>
            <TopBar.Actions>
                <Icons>
                    <TopBarAvatar />
                    <NotificationBell />
                    <HelpMenu />

                    {/* <Action
                        onClick={() => {
                            openSidesheet(BookmarkSidesheet);
                        }}
                    >
                    <Icon name="bookmarks" />
                </Action> */}
                    {creators.length > 0 && (
                        <ActionWrapper ref={addMenuRef}>
                            <div
                                title={'Add Item'}
                                onFocus={() => setIsAddMenuOpen((s) => !s)}
                                onMouseOver={() => {
                                    setIsAddMenuOpen(true);
                                }}
                                onBlur={() => setIsAddMenuOpen(false)}
                            >
                                <Icon
                                    color={tokens.colors.interactive.primary__resting.hex}
                                    name="add"
                                />
                            </div>
                            <AddMenu
                                anchorEl={addMenuRef.current}
                                isOpen={isAddMenuOpen}
                                handleClose={() => setIsAddMenuOpen(false)}
                                onMouseEnter={() => setIsAddMenuOpen(true)}
                            />
                        </ActionWrapper>
                    )}
                    <ClickableIcon
                        name="bookmarks"
                        onClick={() => openSidesheet(BookmarkSidesheet)}
                    />
                    {clientEnv === 'dev' && <GlobalSearch />}
                </Icons>
            </TopBar.Actions>
        </TopBarWrapper>
    );
};

export default ClientTopBar;
