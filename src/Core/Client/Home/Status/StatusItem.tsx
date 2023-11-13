import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';
import { Container, Content, Header, Heading, Row } from './StatusItemStyles';

interface StatusItemProps {
    title: string;
    live: string;
    actual: string;
    statusColor: () => string;
    position: { x: number; y: number };
}

const StatusItem: FunctionComponent<StatusItemProps> = ({
    title,
    live,
    actual,
    statusColor,
    position,
}) => {
    return (
        <Container {...position}>
            <Header background={statusColor()}>
                <Heading group="heading" variant="h6">
                    {title}
                </Heading>
            </Header>
            <Content>
                <Row background="#e3e3e3">
                    <Typography>Live</Typography>
                    <Typography>Actual</Typography>
                </Row>
                <Row background="#ffffff">
                    <Typography>{live}</Typography>
                    <Typography>{actual}</Typography>
                </Row>
            </Content>
        </Container>
    );
};

export default StatusItem;
