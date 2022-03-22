import { useSideSheet } from '../../packages/Sidesheet/context/sidesheetContext';
import { getWidth } from '../../packages/Sidesheet/Utils/getWidth';
import { Menu } from '../Menu';
import { ServiceMessageBanner, useServiceMessage } from '../Messages';
import { ChildrenWrapper, Wrapper } from './MainLayoutStyles';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
    const sideSheet = useSideSheet();
    const messageData = useServiceMessage();

    return (
        <Wrapper serviceMessageActive={messageData.isActive}>
            <Menu>
                <ChildrenWrapper sideSheetWidth={getWidth(sideSheet)}>{children}</ChildrenWrapper>
                {messageData.isActive && <ServiceMessageBanner {...messageData} />}
            </Menu>
        </Wrapper>
    );
};
