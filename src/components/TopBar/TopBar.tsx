// import { AddMenu } from '@equinor/DataFactory';
import { BookmarkSidesheet } from '@equinor/BookmarksManager';
import { Avatar, Menu, Popover, TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { openSidesheet } from '@equinor/sidesheet';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { getApps } from '../../apps/apps';
import { GlobalSearch } from '../../Core/GlobalSearh/Components/GlobalSearch';
import { NotificationBell } from '../../Core/Notifications/Components/NotificationBell';
import { AddMenu } from '../../FusionModules/DataCreatorReact/Components/AddMenu';
import { useDataCreator } from '../../FusionModules/DataCreatorReact/Hooks/useCreator';
import { useLocationKey } from '../../hooks/useLocationKey/useLocationKey';
import { ClickableIcon } from '../Icon/ClickableIcon';
import Icon from '../Icon/Icon';
import { useMenuContext } from '../Menu';
import { LocationBreadCrumbs } from './BreadCrumbs/Breadcrumbs';
import { DevBar } from './DevBar/DevBar';
import Logo from './Logo/Logo';
import { Action, ActionWrapper, Header, Icons, TopBarWrapper } from './TopBarStyle';

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
                    <AvatarLogIn />
                    <NotificationBell />
                    <HelpMenu />

                    {creators.length > 0 && (
                        <ActionWrapper ref={addMenuRef}>
                            <Action
                                title={'Add Item'}
                                onFocus={() => setIsAddMenuOpen((s) => !s)}
                                onMouseOver={() => {
                                    setIsAddMenuOpen(true);
                                }}
                                onBlur={() => setIsAddMenuOpen(false)}
                            >
                                <Icon name="add" />
                            </Action>
                            <AddMenu
                                anchorEl={addMenuRef.current}
                                isOpen={isAddMenuOpen}
                                handleClose={() => setIsAddMenuOpen(false)}
                                onMouseEnter={() => setIsAddMenuOpen(true)}
                            />
                        </ActionWrapper>
                    )}

                    <Action
                        onClick={() => {
                            openSidesheet(BookmarkSidesheet);
                        }}
                    >
                        <Icon name="bookmarks" />
                    </Action>
                    {clientEnv === 'dev' && <GlobalSearch />}
                </Icons>
            </TopBar.Actions>
            {/* <SupportButton /> */}
        </TopBarWrapper>
    );
};

export default ClientTopBar;

const HelpMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    function giveFeedback() {
        window.open('https://forms.office.com/r/GzdEKzkXWY');
    }

    const locationName = useLocationKey();

    const helpPageUrl = useMemo(
        () => getApps().find(({ shortName }) => shortName === locationName)?.helpPageUrl,
        [locationName]
    );

    return (
        <div ref={ref}>
            <ClickableIcon name="help" onClick={() => setIsOpen(true)} />

            {isOpen && (
                <Menu
                    id="menu-complex"
                    aria-labelledby="anchor-complex"
                    open={isOpen}
                    anchorEl={ref.current}
                    onClose={() => setIsOpen(false)}
                    placement="bottom-end"
                >
                    <Menu.Item disabled={!helpPageUrl} onClick={() => window.open(helpPageUrl)}>
                        <Icon name="info_circle" /> App info
                    </Menu.Item>

                    <Menu.Section>
                        <Menu.Item disabled>
                            <Icon name="comment_more" /> Contact support
                        </Menu.Item>
                        <Menu.Item onClick={giveFeedback}>
                            <Icon name="thumbs_up_down" /> Give feedback
                        </Menu.Item>
                    </Menu.Section>
                </Menu>
            )}
        </div>
    );
};

const AvatarLogIn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const {
        settings: { userImageUrl, user },
    } = useClientContext();

    if (!user) return null;

    return (
        <div>
            <div ref={ref} onClick={open}>
                {!userImageUrl ? (
                    <Icon name="account_circle" />
                ) : (
                    <Avatar alt="User avatar" src={userImageUrl} />
                )}
            </div>
            <Popover anchorEl={ref.current} open={isOpen} onClose={close}>
                <Popover.Content>
                    <Wrapper>
                        <div>
                            <InfoText>Signed in as</InfoText>
                            <UserName>{user.displayName}</UserName>
                        </div>

                        <Meta>
                            <div>{user.jobTitle}</div>
                            <div>{user.userPrincipalName}</div>
                        </Meta>
                    </Wrapper>
                </Popover.Content>
            </Popover>
        </div>
    );
};

const InfoText = styled.div`
    font-size: 12px;
    font-weight: 500;
`;
const UserName = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

const Meta = styled.div`
    font-size: 16px;
    font-weight: 400;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
