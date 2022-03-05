import { useClientContext } from '@equinor/portal-client';
import { useSideSheet } from '../../packages/Sidesheet/context/sidesheetContext';
import { getWidth } from '../../packages/Sidesheet/Utils/getWidth';
import { FullscreenMainMenu } from '../Menu/FullscreenMainMenu';
import { MainMenu } from '../Menu/MainMenu';
import { ChildrenWrapper, MainMenuWrapper, Wrapper } from './MainLayoutStyles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useGlobalClientState } from '../../Core/Client/ClientState/ClientState';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const {
        settings: { fullscreenMenuActive },
    } = useClientContext();
    const sideSheet = useSideSheet();
    const {
        settings: { clientEnv },
    } = useGlobalClientState();

    return (
        <Wrapper>
            {fullscreenMenuActive && <FullscreenMainMenu />}
            <MainMenuWrapper>
                <MainMenu />
            </MainMenuWrapper>
            <ChildrenWrapper sideSheetWidth={getWidth(sideSheet)}>{children}</ChildrenWrapper>
            {clientEnv === 'dev' && <ReactQueryDevtools initialIsOpen={false} />}
        </Wrapper>
    );
};
