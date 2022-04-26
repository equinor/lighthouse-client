import { PopoutSidesheet } from '@equinor/sidesheet';
import { Menu } from '../Menu';
import { ChildrenWrapper, SidesheetWrapper, Wrapper } from './MainLayoutStyles';


interface MainLayoutProps {
    children: React.ReactNode;
    serviceMessageActive: boolean;
}

export const MainLayout = ({ children, serviceMessageActive }: MainLayoutProps): JSX.Element => {
    return (
        <Wrapper serviceMessageActive={serviceMessageActive}>
            <Menu>
                <ChildrenWrapper>{children}</ChildrenWrapper>
                <SidesheetWrapper>
                    <PopoutSidesheet />
                </SidesheetWrapper>
            </Menu>
        </Wrapper>
    );
};
