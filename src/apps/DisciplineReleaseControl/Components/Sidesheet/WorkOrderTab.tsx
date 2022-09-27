import { useQuery } from 'react-query';
import { getWorkOrdersById } from '../../Api/getWorkOrdersById';
import { Wrapper, WrapperFillerDiv } from '../../Styles/SidesheetWrapper';
import { Loading, NoWorkOrders } from './workOrderTab.styles';
import { WorkOrderTable } from './WorkOrderTable';

interface WorkOrderTabProps {
    id: string;
}

export function WorkOrderTab({ id }: WorkOrderTabProps): JSX.Element {
    const { data, error } = useQuery([id], () => getWorkOrdersById(id), {
        cacheTime: 5 * 1000 * 60,
        staleTime: 5 * 1000 * 60,
    });

    data?.sort((a, b) => a.workOrderNo?.localeCompare(b?.workOrderNo));

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
            <WorkOrderTable workOrders={data ?? []} />
            <WrapperFillerDiv />
        </Wrapper>
    );
}
