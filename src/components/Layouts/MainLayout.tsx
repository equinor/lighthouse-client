import { PopoutSidesheet } from '@equinor/sidesheet';
import styled from 'styled-components';
import useClientContext from '../../context/clientContext';
import { MainMenu } from '../Menu/MainMenu';

const Wrapper = styled.div`
    position: fixed;
    top: 64px;
    height: calc(100vh - 64px);
    display: flex;
    width: 100vw;
`;
const ChildrenWrapper = styled.div`
    width: calc(100vw - ${({ panelActive }: CssProps) => (panelActive ? '374px' : '74px')});
    transition: width 0.2s ease;
`;
const MainMenuWrapper = styled.div`
    width: ${({ panelActive }: CssProps) => (panelActive ? '374px' : '74px')};
    transition: width 0.2s ease;
`;

interface MainLayoutProps {
    children: React.ReactNode;
}

interface CssProps {
    panelActive: boolean;
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const { appsPanelActive } = useClientContext();
    return (
        <Wrapper>
            <MainMenuWrapper panelActive={appsPanelActive}>
                <MainMenu />
            </MainMenuWrapper>
            <ChildrenWrapper panelActive={appsPanelActive}>{children}</ChildrenWrapper>
            <PopoutSidesheet />
        </Wrapper>
    );
};
