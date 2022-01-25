import { useClientContext } from '@equinor/portal-client';
import { PopoutSidesheet } from '@equinor/sidesheet';
import styled from 'styled-components';
import { FullscreenMainMenu } from '../Menu/FullscreenMainMenu';
import { MainMenu } from '../Menu/MainMenu';

const Wrapper = styled.div`
    position: fixed;
    top: 48px;
    height: calc(100vh - 48px);
    display: flex;
    width: 100vw;
`;
const ChildrenWrapper = styled.div`
    width: calc(100vw - ${({ panelActive }: CssProps) => (panelActive ? '374px' : '48px')});
    transition: width 0.2s ease;
`;
const MainMenuWrapper = styled.div`
    width: ${({ panelActive }: CssProps) => (panelActive ? '374px' : '48px')};
    transition: width 0.2s ease;
    border-right: 1.5px solid #e0e0e0;
`;

interface MainLayoutProps {
    children: React.ReactNode;
}

interface CssProps {
    panelActive: boolean;
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const {
        settings: { appsPanelActive, fullscreenMenuActive },
    } = useClientContext();
    return (
        <Wrapper>
            {fullscreenMenuActive && <FullscreenMainMenu />}
            <MainMenuWrapper panelActive={appsPanelActive}>
                <MainMenu />
            </MainMenuWrapper>
            <ChildrenWrapper panelActive={appsPanelActive}>{children}</ChildrenWrapper>
            {/* TODO: Wrap Resizable here */}
            <PopoutSidesheet />
        </Wrapper>
    );
};
