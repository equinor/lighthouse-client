import { Typography } from '@equinor/eds-core-react';
import { useSettings } from '../Hooks/useClientContext';
import { PowerBIHome } from './PbiHome/PbiHome';
import { Container, Content, Header, ViewportWrapper } from './clientHomeStyles';

export const ClientHome = (): JSX.Element => {
    const { user } = useSettings();

    return (
        <>
            <Content>
                <Header>
                    <Typography variant="h3">Welcome {user?.displayName}</Typography>
                </Header>
                <ViewportWrapper>
                    <Container>
                        <PowerBIHome reportUri={'jca-landing-page '} />
                    </Container>
                </ViewportWrapper>
            </Content>
        </>
    );
};
