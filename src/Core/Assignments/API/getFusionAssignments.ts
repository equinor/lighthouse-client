import { httpClient } from '../../Client/Functions';
import { Assignment } from '../Types/assignment';

export async function getFusionAssignments(): Promise<Assignment[]> {
    const { fusionTasks } = httpClient();

    return await (await fusionTasks.fetch('persons/me/tasks')).json();
}
