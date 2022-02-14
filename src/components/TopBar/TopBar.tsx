import { Avatar, Search, TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/portal-client';
import { SupportButton } from '../../Core/Client/Support/Support';
import Icon from '../Icon/Icon';
import Logo from './Logo/Logo';
import { BetaTag, Icons, TopBarWrapper } from './TopBarStyle';

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
                <BetaTag>
                    <b>UNDER DEVELOPMENT - {clientEnv.toUpperCase()} </b>
                    <p>This site contains test data.</p>
                </BetaTag>
            </TopBar.CustomContent>
            <TopBar.Actions>
                <Icons>
                    {!userImageUrl ? (
                        <Icon name="account_circle" />
                    ) : (
                        <Avatar alt="User avatar" src={userImageUrl} />
                    )}

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
