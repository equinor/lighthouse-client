import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    getPipetestStatus,
    getYearAndWeekFromString,
    sortPipetestChecklist,
    sortPipetests,
} from './Functions/statusHelpers';
import { fieldSettings } from './Components/Garden/gardenSetup';
import { Pipetest } from './Types/pipetest';
import { ReleaseControlGardenItem } from './Components/Garden/ReleaseControlGardenItem';
import { checklistTagFunc, createChecklistSteps, getHTList } from './Functions/tableHelpers';
import { getTimePeriod } from './Components/Garden/gardenFunctions';

export function setup(appApi: ClientApi): void {
    const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
        const { FAM } = httpClient();
        return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal: signal });
    };

    const responseParser = async (response: Response) => {
        const json = JSON.parse(await response.text());
        json.map((pipetest: Pipetest) => {
            pipetest.checkLists = sortPipetestChecklist(pipetest.checkLists);
            pipetest.heatTraces = pipetest.checkLists.filter(({ isHeatTrace }) => isHeatTrace);
            pipetest.status = getPipetestStatus(pipetest.checkLists);
            pipetest.dueDateTimePeriod = getTimePeriod(pipetest);
            return pipetest;
        });
        sortPipetests(json);
        return json;
    };

    const releaseControlExcludeKeys: (keyof Pipetest)[] = ['name'];

    const request = appApi
        .createWorkSpace<Pipetest>({
            CustomSidesheet: ReleaseControlSidesheet,
            objectIdentifier: 'name',
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerDataCreator({
            title: 'Release control',
            component: ReleaseControlProcessForm,
        })
        .registerFilterOptions({
            excludeKeys: releaseControlExcludeKeys,
            headerNames: {},
            defaultActiveFilters: ['status', 'System', 'Priority', 'DueDateTimePeriod'],
            valueFormatter: {
                System: (item: Pipetest): string => {
                    return item.name.substring(0, 2);
                },
                Priority: (item: Pipetest): string => {
                    return item.commPkPriority1 !== '' ? item.commPkPriority1 : 'Unknown';
                },
                DueDateTimePeriod: (item: Pipetest): string => {
                    return item.dueDateTimePeriod;
                },
            },
        });

    // request.registerDataSource(async () => {
    //     const { releaseControls } = httpClient();
    //     const response = await releaseControls.fetch(`/api/release-control-processes`);
    //     return JSON.parse(await response.text());
    // });

    request.registerTableOptions({
        objectIdentifierKey: 'name',
        columnOrder: ['name', 'description', 'status'],
        hiddenColumns: ['rfccPlanned', 'dueDateTimePeriod'],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 200 },
            { key: 'description', title: 'Description', width: 400 },
            { key: 'status', title: 'Status', width: 300 },
            { key: 'checkLists', title: 'Process', width: 260 },
            { key: 'commPkPriority1', title: 'Priority', width: 200 },
        ],
        customCellView: [
            {
                key: 'checkLists',
                type: {
                    Cell: ({ cell }: any) => {
                        return (
                            <WorkflowCompact
                                steps={createChecklistSteps(cell.value.content.checkLists)}
                                statusDotFunc={checklistTagFunc}
                                spanDirection={'horizontal'}
                                dotSize={22}
                            />
                        );
                    },
                },
            },
        ],
        customColumns: [
            {
                id: 'dueByWeek',
                Header: 'Due by week',
                Aggregated: () => null,
                width: 300,
                aggregate: 'count',
                Cell: (cell) => {
                    return getYearAndWeekFromString(cell.row.values.rfccPlanned);
                },
            },
            {
                id: 'htList',
                Header: 'Heattraces',
                Aggregated: () => null,
                width: 800,
                aggregate: 'count',
                Cell: (cell) => {
                    return getHTList(cell.row.values.checkLists.content.checkLists);
                },
            },
        ],
    });

    request.registerGardenOptions({
        gardenKey: 'status',
        itemKey: 'name',
        fieldSettings: fieldSettings,
        customViews: {
            customItemView: ReleaseControlGardenItem,
        },
    });
}
