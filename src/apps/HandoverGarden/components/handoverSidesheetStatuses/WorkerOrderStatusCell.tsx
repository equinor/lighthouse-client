import { CellProps } from '@equinor/fusion-react-table';
import { HandoverWorkOrder } from '@equinor/fusion/lib/http/apiClients/DataProxyClient';
import { getCONStyle, getHandoverWorkOrderStatus } from '../../utility';

export const WorkOrderStatusCell = (props: CellProps<HandoverWorkOrder, HandoverWorkOrder>) => {
    const { value } = props;
    return (
        <span title={getHandoverWorkOrderStatus(value)} style={getCONStyle(value)}>
            CON
        </span>
    );
};
