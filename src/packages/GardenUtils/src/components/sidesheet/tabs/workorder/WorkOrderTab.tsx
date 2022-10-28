import { TabTable } from '../../TabTable';
import { columns } from './columns';
import { WorkOrderBase } from './types';

type WorkOrderTabProps<T extends WorkOrderBase> = {
    workorders: T[] | undefined;
    isLoading: boolean;
    error: Error | null;
};
export const WorkOrderTab = <T extends WorkOrderBase>({
    error,
    isLoading,
    workorders,
}: WorkOrderTabProps<T>): JSX.Element => {
    return (
        <div>
            <TabTable
                packages={workorders}
                columns={columns()}
                error={error}
                isFetching={isLoading}
                resourceName="Workorders"
            />
        </div>
    );
};
