import { Avatar, TopBar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useGraphClient } from '@equinor/http-client';
import { useClientContext } from '@equinor/portal-client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon/Icon';
import Logo from './Logo/Logo';

const Icons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    > * {
        margin-left: 40px;
    }
`;

const TopBarWrapper = styled.div`
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 48px;
    > header {
        padding-left: 1.5rem;
    }
`;

const ProCoSysTopBar = (): JSX.Element => {
    const { toggleAppPanel, toggleFullscreenMenu, settings, internal } = useClientContext();
    const graph = useGraphClient(internal.authProvider);
    const [image, setImage] = useState<string | undefined>(undefined);
    useEffect(() => {
        graph.graphGetProfilePicture().then((img) => setImage(img));
    }, []);
    return (
        <TopBarWrapper>
            <TopBar>
                <TopBar.Header>
                    <div
                        onClick={() => {
                            toggleAppPanel();
                            settings.fullscreenMenuActive ? toggleFullscreenMenu() : null;
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <Icon color={tokens.colors.interactive.primary__resting.hex} name="menu" />
                    </div>
                    <Logo />
                </TopBar.Header>
                <TopBar.CustomContent>
                    {/* <CustomContentWrapper>
                        <PlantSelector />
                        <Search aria-label="sitewide" id="search-normal" placeholder="Search..." />
                    </CustomContentWrapper> */}
                </TopBar.CustomContent>
                <TopBar.Actions>
                    <Icons>
                        {image && <Avatar alt="User avatar" size={16} src={image} />}
                        <Icon name="notifications" size={16} />
                    </Icons>
                </TopBar.Actions>
            </TopBar>
        </TopBarWrapper>
    );
};

export default ProCoSysTopBar;
