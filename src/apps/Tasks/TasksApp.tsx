import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { DateTime } from 'luxon';
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
            CustomSidesheet: TasksSidesheet,
        })
        .registerDataSource({
            responseAsync,
        })
        .registerFilterOptions([
            { name: 'Application', valueFormatter: (s) => s.sourceSystem.subSystem },
            { name: 'Type', valueFormatter: (s) => s.type },
            { name: 'State', valueFormatter: (s) => s.state, defaultUncheckedValues: ['Closed'] },
        ])
        .registerTableOptions({
            objectIdentifierKey: 'id',
            columnOrder: ['title', 'id', 'category', 'url'],
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
                'id',
                'created',
                'dueDate',
                'modified',
                'url',
            ],
            headers: [
                { key: 'title', title: 'Title', width: 200 },
                { key: 'category', title: 'Category' },
                { key: 'url', title: 'URL' },
                { key: 'state', title: 'State' },
                { key: 'priority', title: 'Priority' },
                { key: 'dueDate', title: 'Due at' },
                { key: 'created', title: 'Created at' },
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
            gardenKey: 'state',
            itemKey: 'id',
            type: 'normal',
            fieldSettings: {
                Category: { label: 'Category', getKey: (s) => s.category },
            },
        });
    // .registerPowerBIOptions({
    //     pages: [
    //         {
    //             pageId: 'ReportSectionb822b2eb4fc97aef255b',
    //             pageTitle: 'Overview',
    //             default: true,
    //         },
    //         {
    //             pageId: 'ReportSection40a8a70e6f82243888ca',
    //             pageTitle: 'History',
    //         },
    //     ],
    //     reportURI: 'pp-scope-change-analytics',
    // });
}

export async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { fusionTasks } = httpClient();

    return await fusionTasks.fetch('persons/me/tasks', { signal });
}

interface TasksSidesheetProps {
    item: Assignment;
    actions: SidesheetApi;
}
export function TasksSidesheet({ actions, item }: TasksSidesheetProps) {
    useEffect(() => {
        actions.setTitle(item.title);
    }, []);

    return <div>Hello guys</div>;
}
