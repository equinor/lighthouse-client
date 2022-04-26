import { PopoutSidesheet, useSideSheet } from '@equinor/sidesheet';
import { getWidth } from '../../packages/Sidesheet/Utils/getWidth';
import { Menu } from '../Menu';
import { ChildrenWrapper, SidesheetWrapper, Wrapper } from './MainLayoutStyles';

interface MainLayoutProps {
    children: React.ReactNode;
    serviceMessageActive: boolean;
}

export const MainLayout = ({ children, serviceMessageActive }: MainLayoutProps): JSX.Element => {
    const sideSheet = useSideSheet();

    return (
        <Wrapper serviceMessageActive={serviceMessageActive}>
            <Menu>
                <ChildrenWrapper sideSheetWidth={getWidth(sideSheet)}>{children}</ChildrenWrapper>
                <SidesheetWrapper>
                    <PopoutSidesheet />
                </SidesheetWrapper>
            </Menu>
        </Wrapper>
    );
};
