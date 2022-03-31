import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
// import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    getPipetestCompletionStatus,
    getPipetestStatus,
    getShortformCompletionStatusName,
    getYearAndWeekFromString,
    sortPipetestChecklist,
    sortPipetests,
} from './Functions/statusHelpers';
import { fieldSettings, getHighlightedColumn } from './Components/Garden/gardenSetup';
import { Pipetest } from './Types/pipetest';
import { checklistTagFunc, createChecklistSteps, getHTList } from './Functions/tableHelpers';
import { getTimePeriod } from './Components/Garden/gardenFunctions';
import { PipetestStep } from './Types/drcEnums';
import { DateTime } from 'luxon';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
// import { ReleaseControlGardenHeader } from './Components/Garden/ReleaseControlGardenHeader';
import ReleaseControlGardenItem from './Components/Garden/ReleaseControlGardenItem';

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
            pipetest.step = getPipetestStatus(pipetest);
            pipetest.completionStatus = getPipetestCompletionStatus(pipetest);
            pipetest.shortformCompletionStatus = getShortformCompletionStatusName(
                pipetest.completionStatus
            );
            pipetest.dueDateTimePeriod = getTimePeriod(pipetest);
            pipetest.overdue =
                pipetest.step !== PipetestStep.Complete &&
                DateTime.now() > DateTime.fromISO(pipetest.rfccPlanned)
                    ? 'Yes'
                    : 'No';
            return pipetest;
        });
        sortPipetests(json);
        return json;
    };

    const releaseControlExcludeKeys: (keyof Pipetest)[] = [
        'name',
        'commPkPriority1',
        'rfccPlanned',
        'description',
        'step',
        'completionStatus',
        'shortformCompletionStatus',
    ];

    const request = appApi
        .createWorkSpace<Pipetest>({
            CustomSidesheet: ReleaseControlSidesheet,
            objectIdentifier: 'name',
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        // .registerDataCreator({
        //     title: 'Release control',
        //     component: ReleaseControlProcessForm,
        // })
        .registerFilterOptions({
            excludeKeys: releaseControlExcludeKeys,
            headerNames: {},
            defaultActiveFilters: [
                'currentStep',
                'System',
                'Priority',
                'dueDateTimePeriod',
                'overdue',
                'CompletionStatus',
            ],
            valueFormatter: {
                currentStep: (item: Pipetest): string => {
                    return item.step;
                },
                System: (item: Pipetest): string => {
                    return item.name.substring(0, 2);
                },
                Priority: (item: Pipetest): string => {
                    return item.commPkPriority1 !== '' ? item.commPkPriority1 : 'Unknown';
                },
                CompletionStatus: (item: Pipetest): string => {
                    return item.shortformCompletionStatus;
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
        itemSize: 32,
        columnOrder: ['name', 'description', 'commPkPriority1', 'step'],
        hiddenColumns: [
            'rfccPlanned',
            'dueDateTimePeriod',
            'heatTraces',
            'overdue',
            'completionStatus',
            'insulationBoxes',
            'shortformCompletionStatus',
        ],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 100 },
            { key: 'description', title: 'Description', width: 600 },
            { key: 'commPkPriority1', title: 'Priority', width: 90 },
            { key: 'step', title: 'Current step', width: 210 },
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
                                steps={createChecklistSteps(cell.value.content)}
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
                width: 120,
                aggregate: 'count',
                Cell: (cell) => {
                    return getYearAndWeekFromString(cell.row.values.rfccPlanned);
                },
            },
            {
                id: 'htList',
                Header: 'HT cables',
                Aggregated: () => null,
                width: 400,
                aggregate: 'count',
                Cell: (cell) => {
                    return getHTList(cell.row.values.checkLists.content.checkLists);
                },
            },
        ],
    });

    request.registerGardenOptions({
        gardenKey: 'dueAtDate' as any,
        itemKey: 'name',
        type: 'virtual',
        fieldSettings: fieldSettings,
        customViews: {
            customItemView: ReleaseControlGardenItem,
            // customHeaderView: ReleaseControlGardenHeader,
        },
        //Add highlightColumn when it is fixed
        highlightColumn: getHighlightedColumn,
        itemWidth: () => 150,
        rowHeight: 25,
    });

    request.registerStatusItems(statusBarConfig);
}
