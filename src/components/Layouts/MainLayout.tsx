import { useClientContext } from '@equinor/portal-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useGlobalClientState } from '../../Core/Client/ClientState/ClientState';
import { useSideSheet } from '../../packages/Sidesheet/context/sidesheetContext';
import { getWidth } from '../../packages/Sidesheet/Utils/getWidth';
import { FullscreenMainMenu } from '../Menu/FullscreenMainMenu';
import { MainMenu } from '../Menu/MainMenu';
import { ServiceMessageBanner, useServiceMessage } from '../Messages';
import { ChildrenWrapper, MainMenuWrapper, Wrapper } from './MainLayoutStyles';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const {
        settings: { fullscreenMenuActive },
    } = useClientContext();
    const sideSheet = useSideSheet();
    const messageData = useServiceMessage();
    const {
        settings: { clientEnv },
    } = useGlobalClientState();

    return (
        <Wrapper serviceMessageActive={messageData.isActive}>
            {fullscreenMenuActive && <FullscreenMainMenu />}
            <MainMenuWrapper>
                <MainMenu />
            </MainMenuWrapper>
            <ChildrenWrapper sideSheetWidth={getWidth(sideSheet)}>{children}</ChildrenWrapper>
            {messageData.isActive && <ServiceMessageBanner {...messageData} />}
            {clientEnv === 'dev' && <ReactQueryDevtools initialIsOpen={false} />}
        </Wrapper>
    );
};
