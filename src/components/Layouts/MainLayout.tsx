import { tokens } from '@equinor/eds-tokens';
import { useClientContext } from '@equinor/portal-client';
import styled from 'styled-components';
import {
    SystemBanner,
    useSystemMessage
} from '../../Core/Messages/System/Compoenents/SystemMessage';
import { useSideSheet } from '../../packages/Sidesheet/context/sidesheetContext';
import { getWidth } from '../../packages/Sidesheet/Utils/getWidth';
import { FullscreenMainMenu } from '../Menu/FullscreenMainMenu';
import { MainMenu } from '../Menu/MainMenu';

interface WrapperProps {
    systemMessageActive?: boolean;
}
const Wrapper = styled.div`
    position: fixed;
    top: ${({ systemMessageActive }: WrapperProps) => (systemMessageActive ? '96px' : '48px')};
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    width: 100vw;
`;
const ChildrenWrapper = styled.div`
    width: calc(
        100vw -
            ${({ panelActive, sideSheetWidth }: CssProps) =>
                (panelActive ? 374 : 48) + (sideSheetWidth || 0)}px
    );
    transition: width 0.2s ease;
`;
const MainMenuWrapper = styled.div`
    width: ${({ panelActive }: CssProps) => (panelActive ? '374px' : '48px')};
    transition: width 0.2s ease;
    border-right: 2px solid ${tokens.colors.ui.background__light.rgba};
`;

interface MainLayoutProps {
    children: React.ReactNode;
}

interface CssProps {
    panelActive: boolean;
    sideSheetWidth?: number;
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const {
        settings: { appsPanelActive, fullscreenMenuActive },
    } = useClientContext();
    const sideSheet = useSideSheet();
    const messageData = useSystemMessage();

    return (
        <Wrapper systemMessageActive={messageData.isActive}>
            {fullscreenMenuActive && <FullscreenMainMenu />}
            {messageData.isActive && (
                <SystemBanner {...messageData} handleClose={messageData.handleClose} />
            )}
            <MainMenuWrapper panelActive={appsPanelActive}>
                <MainMenu />
            </MainMenuWrapper>
            <ChildrenWrapper sideSheetWidth={getWidth(sideSheet)} panelActive={appsPanelActive}>
                {children}
            </ChildrenWrapper>
        </Wrapper>
    );
};
