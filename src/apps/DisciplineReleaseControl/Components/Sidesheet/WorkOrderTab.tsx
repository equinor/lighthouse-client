import { useQuery } from 'react-query';
import { getWorkOrdersById } from '../../Api/getWorkOrdersById';
import { Loading, NoWorkOrders, Wrapper } from './workOrderTab.styles';
import { WorkOrderTable } from './WorkOrderTable';

interface WorkOrderTabProps {
    id: string;
}

export function WorkOrderTab({ id }: WorkOrderTabProps): JSX.Element {
    const { data, error } = useQuery([id], () => getWorkOrdersById(id), {
        cacheTime: 5 * 1000 * 60,
        staleTime: 5 * 1000 * 60,
    });

    if (error) {
        return (
            <Loading>
                <div>Failed to load workorders!</div>
            </Loading>
        );
    }

    if (data?.length === 0) {
        return (
            <Loading>
                <NoWorkOrders>There are no connected work orders</NoWorkOrders>
            </Loading>
        );
    }

    return (
        <Wrapper>
            <div>
                <WorkOrderTable workOrders={data ?? []} />
            </div>
        </Wrapper>
    );
}
