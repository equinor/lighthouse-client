import { statusColorMap } from '@equinor/GardenUtils';
import { McStatus } from '../../types';
import { Container, StatusColor, Title } from './StatusFilter.styles';

type McStatusFilterProps = {
    status: McStatus;
};

export const McStatusFilter = ({ status }: McStatusFilterProps) => {
    return (
        <Container>
            <StatusColor color={statusColorMap[status]} />
            <Title>{status}</Title>
        </Container>
    );
};
