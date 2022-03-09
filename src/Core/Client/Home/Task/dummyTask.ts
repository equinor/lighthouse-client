import { User } from '@microsoft/microsoft-graph-types';
import { ProcosysTasks } from './types';

export function getDummyTask(env: string, user: User): ProcosysTasks[] {
    if (env === 'dev') {
        return [
            {
                id: '1',
                title: 'This is a link to active test task',
                url: '#',
                dueDate: '08/02/2022',
                assignedTo: {
                    person: {
                        name: user.givenName,
                    },
                },
            },
            {
                id: '2',
                title: 'This is a link to overdue test task',
                url: '#',
                dueDate: '01/02/2022',
                assignedTo: {
                    person: {
                        name: user.givenName,
                    },
                },
            },
            {
                id: '3',
                title: 'This is a link to overdue test task',
                url: '#',
                dueDate: '01/01/2022',
                assignedTo: {
                    person: {
                        name: user.givenName,
                    },
                },
            },
        ] as ProcosysTasks[];
    } else {
        return [] as ProcosysTasks[];
    }
}
