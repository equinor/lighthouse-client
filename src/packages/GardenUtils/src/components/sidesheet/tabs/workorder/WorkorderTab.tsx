import { TabTable } from '../../TabTable';
import { StyledContentWrapper } from '../tabs.styles';
import { columns } from './columns';
import { WorkOrderBase } from './types';

type WorkOrderTabProps<T extends WorkOrderBase> = {
    workorders: T[] | undefined;
    isLoading: boolean;
    error: Error | null;
};

export const WorkorderTab = <T extends WorkOrderBase>({
    error,
    isLoading,
    workorders,
}: WorkOrderTabProps<T>): JSX.Element => {
    return (
        <StyledContentWrapper>
            <TabTable
                columns={columns()}
                error={error}
                isFetching={isLoading}
                packages={workorders}
                resourceName="Workorders"
            />
        </StyledContentWrapper>
    );
};
