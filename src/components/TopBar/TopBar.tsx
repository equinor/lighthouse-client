import { Avatar, TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/portal-client';
import { SupportButton } from '../../Core/Client/Support/Support';
import Icon from '../Icon/Icon';
import { DevBar } from './DevBar/DevBar';
import Logo from './Logo/Logo';
import { Action, Icons, TopBarWrapper } from './TopBarStyle';

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
                    {/* <NotificationsDrawer /> */}
                    <Action
                        title="Service Request Form for Johan Castberg Portal"
                        onClick={() => {
                            window.open('https://forms.office.com/r/GzdEKzkXWY');
                        }}
                    >
                        <Icon name="format_list_bulleted" />
                    </Action>
                    <Action
                        disabled
                        onClick={() => {
                            // Search
                        }}
                    >
                        <Icon name="search" />
                    </Action>
                </Icons>
            </TopBar.Actions>
            <SupportButton />
        </TopBarWrapper>
    );
};

export default ClientTopBar;
