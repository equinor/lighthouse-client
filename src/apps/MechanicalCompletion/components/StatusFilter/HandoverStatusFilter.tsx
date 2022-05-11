import { Container, StatusColor, Title } from './StatusFilter.styles';
import { CommissioningStatus } from '../../types';
import { commStatusColors } from '../../utils/config/theme';
type HandoverStatusFilter = {
    status: CommissioningStatus;
};
export const HandoverStatusFilter = ({ status }: HandoverStatusFilter) => {
    return (
        <Container>
            <StatusColor color={commStatusColors[status]} />
            <Title title={status.toString()}>{status}</Title>
        </Container>
    );
};
