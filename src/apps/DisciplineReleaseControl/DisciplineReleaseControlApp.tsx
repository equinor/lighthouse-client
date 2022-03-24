import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
// import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    getPipetestCompletionStatus,
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
import { PipetestStep } from './Types/drcEnums';
import { DateTime } from 'luxon';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';

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
            pipetest.step = getPipetestStatus(pipetest.checkLists);
            pipetest.completionStatus = getPipetestCompletionStatus(pipetest);
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
        // .registerDataCreator({
        //     title: 'Release control',
        //     component: ReleaseControlProcessForm,
        // })
        .registerFilterOptions({
            excludeKeys: releaseControlExcludeKeys,
            headerNames: {},
            defaultActiveFilters: ['step', 'System', 'Priority', 'DueDateTimePeriod', 'Overdue'],
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
                Overdue: (item: Pipetest): string => {
                    return item.overdue;
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
        columnOrder: ['name', 'description', 'commPkPriority1', 'step', 'completionStatus'],
        hiddenColumns: [
            'rfccPlanned',
            'dueDateTimePeriod',
            'heatTraces',
            'overdue',
            'completionStatus',
        ],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 100 },
            { key: 'description', title: 'Description', width: 600 },
            { key: 'commPkPriority1', title: 'Priority', width: 90 },
            { key: 'step', title: 'Step', width: 210 },
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
                width: 120,
                aggregate: 'count',
                Cell: (cell) => {
                    return getYearAndWeekFromString(cell.row.values.rfccPlanned);
                },
            },
            {
                id: 'htList',
                Header: 'Heattraces',
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
        gardenKey: 'step',
        itemKey: 'name',
        type: 'normal',
        fieldSettings: fieldSettings,
        customViews: {
            customItemView: ReleaseControlGardenItem,
        },
        intercepters: {
            postGroupSorting: (pipetest, keys) => {
                if (keys[0] === 'dueAtDate') {
                    return pipetest.sort((a, b) => {
                        let aValue = a.value.replace('-', '');
                        let bValue = b.value.replace('-', '');

                        if (aValue.length === 5) {
                            // console.log(aValue)
                            aValue = aValue.substring(0, 4) + '0' + aValue.substring(4);
                            // console.log(aValue)
                        }
                        if (bValue.length === 5) {
                            bValue = bValue.substring(0, 4) + '0' + bValue.substring(4);
                        }

                        return Number(aValue) - Number(bValue);
                    });
                } else {
                    return pipetest;
                }
            },
        },
    });

    request.registerStatusItems(statusBarConfig);
}
