import styled from 'styled-components';
import { WorkOrderTable } from '../../../WorkOrderTable/WorkOrderTable';
import { useParentSize } from '@cutting/use-get-parent-size';
import { useRef } from 'react';
import { getWorkOrderByIds } from '../../../../api/FAM/getWorkOrderById';
import { useQuery } from 'react-query';
import { CompactWorkOrderList } from '../../../WorkOrderTable/CompactWorkOrder/CompactWorkOrdersList';

export function WorkOrderTab(): JSX.Element {
    const woNumbers = [];

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

const Wrapper = styled.div`
    height: 80%;
`;

const Loading = styled.div`
    width: 100%;
    min-width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
`;
