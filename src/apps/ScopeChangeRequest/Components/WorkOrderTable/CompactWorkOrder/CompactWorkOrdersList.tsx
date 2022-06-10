import styled from 'styled-components';
import { WorkOrder } from '../../../types/FAM/workOrder';
import { CompactWorkorder } from './CompactWorkOrder';

interface CompactWorkOrderListProps {
    workOrders: WorkOrder[];
}

export const CompactWorkOrderList = ({ workOrders }: CompactWorkOrderListProps): JSX.Element => {
    const highestEstimate = Math.max(
        ...workOrders.map(({ estimatedHours }) => estimatedHours ?? 0)
    );
    const highestExpended = Math.max(
        ...workOrders.map(({ expendedHours }) => Number(expendedHours) ?? 0)
    );

    return (
        <ListWrapper>
            {workOrders.map((wo) => (
                <CompactWorkorder
                    highestEstimate={highestEstimate}
                    highestExpended={highestExpended}
                    key={wo.workOrderNumber}
                    wo={wo}
                />
            ))}
        </ListWrapper>
    );
};

const ListWrapper = styled.div`
    display: flex;
    gap: 2em;
    flex-direction: column;
`;
