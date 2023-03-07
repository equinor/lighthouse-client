import { WorkOrderTable } from '../../../WorkOrderTable/WorkOrderTable';
import { useParentSize } from '@cutting/use-get-parent-size';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { CompactWorkOrderList } from '../../../WorkOrderTable/CompactWorkOrder/CompactWorkOrdersList';
import { Loading, NoWorkOrders, Wrapper } from './workOrderTab.styles';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { getWorkOrderByIds, WorkOrder } from '@equinor/Workflow';

export function WorkOrderTab(): JSX.Element {
    const woNumbers =
        useScopeChangeContext((s) => s.request.workOrders?.map(({ jobNumber }) => jobNumber)) ?? [];

    const { data, error, isLoading } = useQuery(
        ['WO', ...woNumbers],
        () => getWorkOrderByIds(woNumbers),
        {
            cacheTime: 5 * 1000 * 60,
            staleTime: 5 * 1000 * 60,
        }
    );

    const ref = useRef<null | HTMLDivElement>(null);
    const { width } = useParentSize(ref);

    if (error) {
        return (
            <Loading>
                <div>Failed to load work orders!</div>
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

    if (isLoading) {
        return (
            <Loading>
                <div>Loading work orders</div>
            </Loading>
        );
    }

    const mergedWos = mergeWos(data, woNumbers);

    return (
        <Wrapper>
            {data?.length !== woNumbers.length && <i>* Some work orders did not load correctly</i>}
            <div ref={ref}>
                {width > 960 ? (
                    <WorkOrderTable workOrders={mergedWos ?? []} />
                ) : (
                    <CompactWorkOrderList workOrders={mergedWos ?? []} />
                )}
            </div>
        </Wrapper>
    );
}
/** Find the WO numbers that did not get retrieved correctly from FAM/PCS */
function findNotFoundWoNos(famWos: WorkOrder[], woNos: string[]) {
    const notFoundWoNos: string[] = [];
    woNos.forEach((woNo) => {
        if (famWos.findIndex((workOrder) => workOrder.workOrderNumber === woNo) === -1) {
            notFoundWoNos.push(woNo);
        }
    });
    return notFoundWoNos;
}

/** Merge potentially not found WOs with the WOs retrieved from FAM */
function mergeWos(famWos: WorkOrder[] = [], woNos: string[]) {
    /** If all WOs are retrieved correctly, just return early */
    if (famWos.length === woNos.length) {
        return famWos;
    }

    const notFoundWoNos = findNotFoundWoNos(famWos, woNos);

    const notFoundWos: WorkOrder[] = notFoundWoNos.map((woNo) => ({
        workOrderNumber: woNo,
        actualCompletionDate: null,
        actualStartupDate: null,
        description: 'WORK ORDER NOT FOUND',
        discipline: null,
        disciplineCode: null,
        estimatedHours: 0,
        facility: null,
        holdBy: null,
        holdByDescription: '',
        jobStatus: null,
        plannedFinishDate: null,
        plannedStartupDate: null,
        projectIdentifier: null,
        projectProgress: null,
        remainingHours: 0,
        responsible: null,
        responsibleCode: null,
        w2ActualDate: null,
        w3ActualDate: null,
        w4ActualDate: null,
        w6ActualDate: null,
        workOrderId: woNo,
        workOrderUrlId: null,
        expendedHours: '0',
    }));

    return famWos.concat(notFoundWos);
}
