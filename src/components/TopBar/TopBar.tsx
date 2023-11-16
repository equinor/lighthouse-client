import { BookmarkSidesheet } from '@equinor/BookmarksManager';
import { TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { openSidesheet } from '@equinor/sidesheet';
import { GlobalSearch } from '../../Core/GlobalSearh/Components/GlobalSearch';
import { NotificationBell } from '../../Core/Notifications/Components/NotificationBell';
import { ClickableIcon } from '../../packages/Components/Icon';
import Icon from '../Icon/Icon';
import { useMenuContext } from '../Menu';
import { LocationBreadCrumbs } from './BreadCrumbs/Breadcrumbs';
import { DevBar } from './DevBar/DevBar';
import { HelpMenu } from './HelpMenu';
import Logo from './Logo/Logo';
import { TopBarAvatar } from './TopBarAvatar';
import { Header, Icons, TopBarWrapper } from './TopBarStyle';

const ClientTopBar = (): JSX.Element => {
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
