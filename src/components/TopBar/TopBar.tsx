import { Avatar, Search, TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/portal-client';
import { SupportButton } from '../../Core/Client/Support/Support';
import Icon from '../Icon/Icon';
import { DevBar } from './DevBar/DevBar';
import Logo from './Logo/Logo';
import { Icons, TopBarWrapper } from './TopBarStyle';
import { NotificationsDrawer } from '../../Core/Notifications/Components/NotificationsDrawer';

const ClientTopBar = (): JSX.Element => {
    const {
        toggleFullscreenMenu,
        settings: { userImageUrl, clientEnv },
    } = useClientContext();

    return (
        <TopBarWrapper>
            <TopBar.Header>
                <div
                    onClick={() => {
                        toggleFullscreenMenu();
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <Icon color={tokens.colors.interactive.primary__resting.hex} name="apps" />
                </div>
                <Logo />
            </TopBar.Header>
            <TopBar.CustomContent>
                <DevBar env={clientEnv} />
            </TopBar.CustomContent>
            <TopBar.Actions>
                <Icons>
                    {!userImageUrl ? (
                        <Icon name="account_circle" />
                    ) : (
                        <Avatar alt="User avatar" src={userImageUrl} />
                    )}
                    <NotificationsDrawer />
                    <Search
                        disabled
                        aria-label="sitewide"
                        id="search-normal"
                        placeholder="Search..."
                    />
                </Icons>
            </TopBar.Actions>
            <SupportButton />
        </TopBarWrapper>
    );
};

export default ClientTopBar;
