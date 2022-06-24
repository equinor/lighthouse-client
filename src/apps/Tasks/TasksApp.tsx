import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { useEffect } from 'react';
import { Assignment } from '../../Core/Assignments/Types/assignment';
import { openSidesheetById } from '../../packages/Sidesheet/Functions';
import { SidesheetApi } from '../../packages/Sidesheet/Types/SidesheetApi';
import { Task } from './types/task';

// 'const customCellView = (render: (req: Assignment) => JSX.Element | null) => ({
//     Cell: ({ cell }: any) => <>{render(cell.value.content)}</>,
// });'

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Task>({
            objectIdentifier: 'id',
            defaultTab: 'garden',
            onSelect: (item) => {
                if (item.subCategory === 'ScopeChangeControl') {
                    console.log('change', item);
                    openSidesheetById('change', item.identifier);
                }
                if (item.subCategory === 'COMMPKG') {
                    openSidesheetById('handoverDetails', item.identifier);
                }
                return item['sourceSystem.identifier'];
            },
        })
        .registerDataSource({
            dataSourceAsync,
        })
        .registerFilterOptions([
            { name: 'Application', valueFormatter: (s) => s.sourceSystem },
            { name: 'Type', valueFormatter: ({ type }) => type },
            {
                name: 'State',
                valueFormatter: ({ state }) => state,
                defaultUncheckedValues: ['Closed'],
            },
        ])
        .registerTableOptions({
            objectIdentifierKey: 'id',
            columnOrder: ['id', 'title', 'category'],
            hiddenColumns: ['id'],
            headers: [
                { key: 'id', title: 'ID' },
                { key: 'title', title: 'Title', width: 200 },
                { key: 'category', title: 'Category' },
                { key: 'state', title: 'State' },
                { key: 'dueDate', title: 'Due date' },
                { key: 'identifier', title: 'Source system' },
                { key: 'description', title: 'Description' },
            ],
        })
        .registerGardenOptions({
            objectIdentifier: 'id',
            gardenKey: 'state',
            itemKey: 'id',
            fieldSettings: {
                Category: { label: 'Category', getKey: (s) => s.category },
            },
        });
}

async function getTasks(): Promise<Task[]> {
    const { fusionTasks } = httpClient();
    const response = await fusionTasks.fetch('persons/me/tasks');
    return taskMapper(await response.json(), {
        id: 'id',
        category: 'category',
        dueDate: 'dueDate',
        subCategory: 'sourceSystem.subSystem',
        sourceSystem: 'sourceSystem.subSystem',
        title: 'title',
        state: 'state',
        description: 'todoDescription',
        identifier: 'sourceSystem.identifier',
        type: 'type',
    });
}

async function getProcosysTasks(): Promise<Task[]> {
    const { fusionTasks } = httpClient();
    const response = await fusionTasks.fetch('persons/me/tasks/procosys');
    return taskMapper(await response.json(), {
        id: 'id',
        category: 'category',
        dueDate: 'dueDate',
        subCategory: 'subCategory',
        sourceSystem: 'description',
        title: 'todo',
        state: 'string',
        description: 'todoDescription',
        identifier: 'title',
        type: '',
    });
}

export async function dataSourceAsync(): Promise<Task[]> {
    const results = await Promise.all<Task[]>([getTasks(), getProcosysTasks()]);
    return results.flat();
}

interface TasksSidesheetProps {
    item: Assignment;
    actions: SidesheetApi;
}

export function TasksSidesheet({ actions, item }: TasksSidesheetProps): JSX.Element {
    useEffect(() => {
        actions.setTitle(item.title);
    }, []);

    return <div>Comning soon...</div>;
}

function taskMapper(tasks: any[], mapper: Record<keyof Task, string>): Task[] {
    console.log(tasks);
    return tasks.map((task) => {
        return Object.keys(mapper).reduce((acc, key) => {
            acc[key] = resolve(mapper[key], task);
            return acc;
        }, {} as Task);
    });
}

function resolve(path, obj = self, separator = '.') {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
}
