import { tokens } from '@equinor/eds-tokens';
import { FunctionComponent } from 'react';
import { Container, Content, Header, Heading } from './StatusItemStyles';

interface StatusItemProps {
    title: string;
}

const StatusItem: FunctionComponent<StatusItemProps> = ({ title }) => {
    return (
        <Container>
            <Header background={tokens.colors.interactive.success__resting.rgba}>
                <Heading group="heading" variant="h6">
                    {title}
                </Heading>
            </Header>
            <Content />
        </Container>
    );
};

export default StatusItem;
