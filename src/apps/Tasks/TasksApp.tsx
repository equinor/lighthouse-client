import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { useEffect } from 'react';
import { Assignment } from '../../Core/Assignments/Types/assignment';
import { SidesheetApi } from '../../packages/Sidesheet/Types/SidesheetApi';

const customCellView = (render: (req: Assignment) => JSX.Element | null) => ({
    Cell: ({ cell }: any) => <>{render(cell.value.content)}</>,
});

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Assignment>({
            objectIdentifier: 'id',
            defaultTab: 'garden',
        })
        .registerDataSource({
            responseAsync,
        })
        .registerFilterOptions([
            { name: 'Application', valueFormatter: (s) => s.sourceSystem.subSystem },
            { name: 'Type', valueFormatter: ({ type }) => type },
            {
                name: 'State',
                valueFormatter: ({ state }) => state,
                defaultUncheckedValues: ['Closed'],
            },
        ])
        .registerTableOptions({
            objectIdentifierKey: 'id',
            columnOrder: ['id', 'title', 'category', 'url'],
            hiddenColumns: [
                'body',
                'taskMode',
                // 'sourceSystem',
                'ownerApplication',
                'taskContexts',
                'metadata',
                'createdBy',
                'modifiedBy',
                'assignedTo',
                'externalId',
                // 'id',
                // 'created',
                // 'dueDate',
                'modified',
                'url',
            ],
            headers: [
                { key: 'id', title: 'ID' },
                { key: 'title', title: 'Title', width: 200 },
                { key: 'category', title: 'Category' },
                { key: 'url', title: 'URL' },
                { key: 'state', title: 'State' },
                { key: 'priority', title: 'Priority' },
                { key: 'dueDate', title: 'Due date' },
                { key: 'created', title: 'Days since notified' },
                { key: 'modified', title: 'Modified at' },
                { key: 'sourceSystem', title: 'Source system' },
            ],
            customCellView: [
                {
                    key: 'ownerApplication',
                    type: customCellView((req) => <>{req.ownerApplication.title}</>),
                },
                {
                    key: 'sourceSystem',
                    type: customCellView((req) => <>{req?.sourceSystem.subSystem}</>),
                },
                {
                    key: 'created',
                    type: customCellView((req) => (
                        <>{new Date(req.created.split('T')[0]).toLocaleDateString('en-gb')}</>
                    )),
                },
            ],
        })
        // .registerIdResolver({
        //     idResolver: async (id) => {
        //         const { fusionTasks } = httpClient();
        //code: 403 cant access instance of tasks, contact fusion core
        //         return await (await fusionTasks.fetch(`tasks/${id}`)).json();
        //     },
        // })
        .registerGardenOptions({
            objectIdentifier: 'id',
            gardenKey: 'state',
            itemKey: 'id',
            fieldSettings: {
                Category: { label: 'Category', getKey: (s) => s.category },
            },
        });
}

export async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { fusionTasks } = httpClient();

    return await fusionTasks.fetch('persons/me/tasks', { signal });
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
