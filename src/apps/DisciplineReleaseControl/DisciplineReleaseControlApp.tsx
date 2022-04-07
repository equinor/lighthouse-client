import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    getPipetestCompletionStatus,
    getPipetestStatus,
    getShortformCompletionStatusName,
    getYearAndWeekFromString,
    isPipetestProcessDoneInRightOrder,
    sortPipetestChecklist,
    sortPipetests,
} from './Functions/statusHelpers';
import { fieldSettings, getHighlightedColumn } from './Components/Garden/gardenSetup';
import { CheckList, Circuit, Pipetest } from './Types/pipetest';
import {
    checklistTagFunc,
    createChecklistSteps,
    getHTList,
    getStatusLetterFromStatus,
} from './Functions/tableHelpers';
import { getGardenItemColor, getTimePeriod } from './Components/Garden/gardenFunctions';
import { CheckListStepTag, PipetestStep } from './Types/drcEnums';
import { DateTime } from 'luxon';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import ReleaseControlGardenItem from './Components/Garden/ReleaseControlGardenItem';
import { Monospace } from './Styles/Monospace';
import {
    CurrentStepContainer,
    WorkflowWarningTriangle,
} from './Components/Workflow/Components/WorkflowWarningTriangle';
import {
    StepFilterContainer,
    WorkflowFilterDot,
} from './Components/Workflow/Components/WorkflowFilterDot';

export function setup(appApi: ClientApi): void {
    const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
        const { FAM } = httpClient();
        return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal: signal });
    };

    const responseParser = async (response: Response) => {
        const json = JSON.parse(await response.text());
        json.map((pipetest: Pipetest) => {
            pipetest.circuits.forEach((circuit: Circuit) => {
                circuit.checkLists.forEach((checkList: CheckList) => {
                    checkList.formularType = CheckListStepTag.HtCTest;
                    checkList.isHeatTrace = true;
                    pipetest.checkLists.push(checkList);
                });
            });
            pipetest.checkLists = sortPipetestChecklist(pipetest.checkLists);
            pipetest.heatTraces = pipetest.checkLists.filter(({ isHeatTrace }) => isHeatTrace);
            pipetest.step = getPipetestStatus(pipetest);
            pipetest.pipetestProcessDoneInRightOrder = isPipetestProcessDoneInRightOrder(pipetest);
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

    const request = appApi
        .createWorkSpace<Pipetest>({
            CustomSidesheet: ReleaseControlSidesheet,
            objectIdentifier: 'name',
            defaultTab: 1,
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions([
            {
                name: 'Current step',
                valueFormatter: ({ step }) => step,
                customValueRender: (value) => {
                    return (
                        <StepFilterContainer>
                            <WorkflowFilterDot
                                color={getGardenItemColor(value?.toString())}
                                circleText={getStatusLetterFromStatus(value?.toString())}
                            />
                            {value}
                        </StepFilterContainer>
                    );
                },
            },
            {
                name: 'System',
                valueFormatter: ({ name }) => name.substring(0, 2),
            },

            {
                name: 'Priority',
                valueFormatter: ({ commPkPriority1 }) =>
                    commPkPriority1 !== '' ? commPkPriority1 : 'Unknown',
            },
            {
                name: 'Due date time period',
                valueFormatter: ({ dueDateTimePeriod }) => dueDateTimePeriod,
            },
            {
                name: 'Overdue',
                valueFormatter: ({ overdue }) => overdue,
            },
            {
                name: 'Completion status',
                valueFormatter: ({ shortformCompletionStatus }) => shortformCompletionStatus,
            },
        ]);

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
            'circuits',
            'pipetestProcessDoneInRightOrder',
            'step',
        ],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 100 },
            { key: 'description', title: 'Description', width: 600 },
            { key: 'commPkPriority1', title: 'Priority', width: 90 },
            { key: 'checkLists', title: 'Process', width: 260 },
            { key: 'commPkPriority1', title: 'Priority', width: 200 },
        ],
        customCellView: [
            {
                key: 'name',
                type: {
                    Cell: ({ cell }: any) => {
                        return <Monospace>{cell.value.content.name}</Monospace>;
                    },
                },
            },
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
                id: 'currentStep',
                accessor: 'step',
                Header: 'Current step',
                Aggregated: () => null,
                width: 210,
                aggregate: 'count',
                Cell: (cell) => {
                    return (
                        <CurrentStepContainer>
                            {cell.row.values.step}
                            {!cell.row.values.pipetestProcessDoneInRightOrder && (
                                <WorkflowWarningTriangle
                                    circleText={''}
                                    popoverText={
                                        'Some steps in this process has been done in the wrong order'
                                    }
                                />
                            )}
                        </CurrentStepContainer>
                    );
                },
            },
            {
                id: 'dueByWeek',
                accessor: 'rfccPlanned',
                Header: 'Due by week',
                Aggregated: () => null,
                width: 120,
                aggregate: 'count',
                Cell: (cell) => {
                    return (
                        <Monospace>
                            {getYearAndWeekFromString(cell.row.values.rfccPlanned)}
                        </Monospace>
                    );
                },
            },
            {
                id: 'htList',
                accessor: 'heatTraces',
                Header: 'HT cables',
                Aggregated: () => null,
                width: 400,
                aggregate: 'count',
                Cell: (cell) => {
                    return (
                        <Monospace>
                            {getHTList(cell.row.values.checkLists.content.checkLists)}
                        </Monospace>
                    );
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
        },
        highlightColumn: getHighlightedColumn,
        itemWidth: () => 150,
        rowHeight: 25,
    });

    request.registerStatusItems(statusBarConfig);
}
