import { httpClient } from '@equinor/portal-client';
import { ProcosysTasks } from '../../Client/Home/Task/types';
import { Assignment } from '../Types/assignment';

export async function getProCoSysAssignments(): Promise<Assignment[] | undefined> {
    const { fusionTasks } = httpClient();

    const response = await fusionTasks.get('persons/me/tasks/procosys');

    const procosysTasks: ProcosysTasks[] = await response.json();
    return procosysTasks.map(
        (task) =>
        ({
            created: task.dueDate,
            dueDate: task.dueDate,
            type: 'External',
            sourceSystem: {
                subSystem: 'ProCoSys',
            },
            title: task.description,
            url: task.url,
        } as Assignment)
    );
}
