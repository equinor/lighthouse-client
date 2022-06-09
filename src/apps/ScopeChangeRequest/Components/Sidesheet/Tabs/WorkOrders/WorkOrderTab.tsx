import { WorkOrderTable } from '../../../WorkOrderTable/WorkOrderTable';
import { useParentSize } from '@cutting/use-get-parent-size';
import { useRef } from 'react';
import { getWorkOrderByIds } from '../../../../api/FAM/getWorkOrderById';
import { useQuery } from 'react-query';
import { CompactWorkOrderList } from '../../../WorkOrderTable/CompactWorkOrder/CompactWorkOrdersList';
import { Loading, NoWorkOrders, Wrapper } from './workOrderTab.styles';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';

export function WorkOrderTab(): JSX.Element {
    const woNumbers =
        useScopeChangeContext((s) => s.request.workOrders?.map(({ jobNumber }) => jobNumber)) ?? [];

    const { data, error } = useQuery(['WO', ...woNumbers], () => getWorkOrderByIds(woNumbers), {
        cacheTime: 5 * 1000 * 60,
        staleTime: 5 * 1000 * 60,
    });

    const ref = useRef<null | HTMLDivElement>(null);
    const { width } = useParentSize(ref);

    if (error) {
        return (
            <Loading>
                <div>Failed to load workorders!</div>
            </Loading>
        );
    }

    if (woNumbers.length === 0) {
        return (
            <Loading>
                <NoWorkOrders>There are no connected work orders</NoWorkOrders>
            </Loading>
        );
    }

    return (
        <Wrapper>
            <div ref={ref}>
                {width > 960 ? (
                    <WorkOrderTable workOrders={data ?? []} />
                ) : (
                    <CompactWorkOrderList workOrders={data ?? []} />
                )}
            </div>
        </Wrapper>
    );
}
