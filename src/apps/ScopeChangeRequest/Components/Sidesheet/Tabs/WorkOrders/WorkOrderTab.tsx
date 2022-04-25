import styled from 'styled-components';
import { WorkOrderTable } from '../../../WorkOrderTable/WorkOrderTable';
import { useParentSize } from '@cutting/use-get-parent-size';
import { useRef } from 'react';
import { getWorkOrderByIds } from '../../../../api/FAM/getWorkOrderById';
import { useQuery } from 'react-query';
import { CompactWorkOrderList } from '../../../WorkOrderTable/CompactWorkOrder/CompactWorkOrdersList';

export function WorkOrderTab(): JSX.Element {
    const woNumbers = [
        200001, 200002, 200003, 200004, 200005, 200006, 200007, 200008, 200009, 200010, 200043,
        200042, 200041,
    ];

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

    return (
        <>
            <div style={{ fontSize: '16px', color: 'red' }}>
                Real workorders but not connected to this request, for testing purposes
            </div>
            <div ref={ref}>
                {width > 960 ? (
                    <WorkOrderTable workOrders={data ?? []} />
                ) : (
                    <CompactWorkOrderList workOrders={data ?? []} />
                )}
            </div>
        </>
    );
}

const Loading = styled.div`
    width: 100%;
    min-width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
`;
