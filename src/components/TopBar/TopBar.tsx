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

const TopBarWrapper = styled(TopBar)`
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 48px;
    padding-left: 12px;
    padding-right: 12px;
    > header {
        padding-left: 1.5rem;
    }
`;

const ClientTopBar = (): JSX.Element => {
    const { toggleFullscreenMenu, authProvider } = useClientContext();
    const graph = useGraphClient(authProvider);
    const [image, setImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        graph.graphGetProfilePicture().then((img) => setImage(img));
    }, [graph]);

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
                {/* <CustomContentWrapper>
                        <PlantSelector />
                        <Search aria-label="sitewide" id="search-normal" placeholder="Search..." />
                    </CustomContentWrapper> */}
            </TopBar.CustomContent>
            <TopBar.Actions>
                <Icons>
                    {image && <Avatar alt="User avatar" src={image} />}
                    {/* <Icon name="notifications" /> */}
                </Icons>
            </TopBar.Actions>
        </TopBarWrapper>
    );
};

export default ClientTopBar;
