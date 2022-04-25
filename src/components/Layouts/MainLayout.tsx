import { Menu } from '../Menu';
import { ChildrenWrapper, Wrapper } from './MainLayoutStyles';

interface MainLayoutProps {
    children: React.ReactNode;
    serviceMessageActive: boolean;
}

export const MainLayout = ({ children, serviceMessageActive }: MainLayoutProps): JSX.Element => {
    return (
        <Wrapper serviceMessageActive={serviceMessageActive}>
            <Menu>
                <ChildrenWrapper>{children}</ChildrenWrapper>
            </Menu>
        </Wrapper>
    );
};
