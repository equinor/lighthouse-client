import { tokens } from '@equinor/eds-tokens';
import { ClientApi } from '@equinor/lighthouse-portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { openSidesheet } from '../../packages/Sidesheet/Functions';
import { DisciplineReleaseControlFactoryComponent } from './Components/Factory/FactoryComponent';
import { getGardenItemColor } from './Components/Garden/gardenFunctions';
import {
    drcGardenKeys,
    fieldSettings,
    getHighlightedColumn,
} from './Components/Garden/gardenSetup';
import ReleaseControlGardenGroupView from './Components/Garden/ReleaseControlGardenGroupView';
import ReleaseControlGardenItem from './Components/Garden/ReleaseControlGardenItem';
import { GatewaySidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    StepFilterContainer,
    StepFilterText,
    WorkflowFilterDot,
} from './Components/Workflow/Components/WorkflowFilterDot';
import { WorkflowWarningTriangle } from './Components/Workflow/Components/WorkflowWarningTriangle';
import { CurrentStepContainer } from './Components/Workflow/Styles/styles';
import { chewPipetestDataFromApi, getYearAndWeekFromString } from './Functions/statusHelpers';
import {
    checklistTagFunc,
    createChecklistSteps,
    getHTList,
    getStatusLetterFromStatus,
} from './Functions/tableHelpers';
import { Monospace } from './Styles/Monospace';
import { PipetestStep } from './Types/drcEnums';
import { Pipetest } from './Types/pipetest';

export function setup(appApi: ClientApi): void {
    const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
        const { FAM } = httpClient();
        return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal: signal });
    };

    const responseParser = async (response: Response) => {
        let json = JSON.parse(await response.text());
        json = chewPipetestDataFromApi(json);
        return json;
    };

    const request = appApi
        .createWorkSpace<Pipetest>({
            CustomSidesheet: GatewaySidesheet,
            objectIdentifier: 'name',
            defaultTab: 'garden',
        })
        .registerDataCreator({
            title: 'Create',
            accessCheck: () => Promise.resolve(true),
            onClick: () => {
                openSidesheet(DisciplineReleaseControlFactoryComponent, undefined, 'piping-and-ht');
            },
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
                            <StepFilterText title={value?.toString()}>{value}</StepFilterText>
                        </StepFilterContainer>
                    );
                },
                sort: (values) => {
                    values.sort((a, b) => {
                        const map = new Map<string, number>();

                        map.set(PipetestStep.Unknown, 0);
                        map.set(PipetestStep.PressureTest, 1);
                        map.set(PipetestStep.ChemicalCleaning, 2);
                        map.set(PipetestStep.HotOilFlushing, 3);
                        map.set(PipetestStep.Bolttensioning, 4);
                        map.set(PipetestStep.Painting, 5);
                        map.set(PipetestStep.HtTest, 6);
                        map.set(PipetestStep.Insulation, 7);
                        map.set(PipetestStep.BoxInsulation, 8);
                        map.set(PipetestStep.HtRetest, 9);
                        map.set(PipetestStep.HtCTest, 10);
                        map.set(PipetestStep.Marking, 11);
                        map.set(PipetestStep.Complete, 12);

                        if (typeof a !== 'string') return 0;
                        if (typeof b !== 'string') return 0;

                        return (map.get(a) ?? -0) - (map.get(b) ?? -0);
                    });
                    return values;
                },
            },

            {
                name: 'Step name',
                valueFormatter: ({ steps }) => steps.filter((v, i, a) => a.indexOf(v) === i),
                defaultHidden: true,
                customValueRender: (value) => {
                    return (
                        <StepFilterContainer>
                            <WorkflowFilterDot
                                color={getGardenItemColor(value?.toString())}
                                circleText={getStatusLetterFromStatus(value?.toString())}
                            />
                            <StepFilterText title={value?.toString()}>{value}</StepFilterText>
                        </StepFilterContainer>
                    );
                },
                sort: (values) => {
                    values.sort((a, b) => {
                        const map = new Map<string, number>();

                        map.set(PipetestStep.Unknown, 0);
                        map.set(PipetestStep.PressureTest, 1);
                        map.set(PipetestStep.ChemicalCleaning, 2);
                        map.set(PipetestStep.HotOilFlushing, 3);
                        map.set(PipetestStep.Bolttensioning, 4);
                        map.set(PipetestStep.Painting, 5);
                        map.set(PipetestStep.HtTest, 6);
                        map.set(PipetestStep.Insulation, 7);
                        map.set(PipetestStep.BoxInsulation, 8);
                        map.set(PipetestStep.HtRetest, 9);
                        map.set(PipetestStep.HtCTest, 10);
                        map.set(PipetestStep.Marking, 11);

                        if (typeof a !== 'string') return 0;
                        if (typeof b !== 'string') return 0;

                        return (map.get(a) ?? -0) - (map.get(b) ?? -0);
                    });
                    return values;
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
                name: 'Location',
                valueFormatter: ({ location }) => location,
            },
            {
                name: 'Due date time period',
                valueFormatter: ({ dueDateTimePeriod }) => dueDateTimePeriod,
            },
            {
                name: 'Overdue',
                valueFormatter: ({ overdue }) => overdue,
                defaultHidden: true,
            },
            {
                name: 'Completion status',
                valueFormatter: ({ shortformCompletionStatus }) => shortformCompletionStatus,
                defaultHidden: true,
            },
            {
                name: 'Switchboard',
                valueFormatter: ({ circuits }) =>
                    circuits
                        .map(({ switchBoardTagNo }) => switchBoardTagNo)
                        .filter((v, i, a) => a.indexOf(v) === i),
            },

            {
                name: 'Circuit',
                valueFormatter: ({ circuits }) =>
                    circuits
                        .map(({ circuitAndStarterTagNo }) =>
                            circuitAndStarterTagNo !== '' ? circuitAndStarterTagNo : null
                        )
                        .filter((v, i, a) => a.indexOf(v) === i),
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
            'steps',
            'pipeInsulationBoxes',
            'pipingRfcUniqueHT',
        ],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 100 },
            { key: 'description', title: 'Description', width: 600 },
            { key: 'commPkPriority1', title: 'Priority', width: 90 },
            { key: 'checkLists', title: 'Checklist status', width: 260 },
            { key: 'commPkPriority1', title: 'Priority', width: 200 },
            { key: 'location', title: 'Location', width: 200 },
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
                                    popoverText={
                                        'Some steps in this process has been done in the wrong order'
                                    }
                                    color={tokens.colors.text.static_icons__default.hex}
                                />
                            )}
                        </CurrentStepContainer>
                    );
                },
            },
            {
                id: 'dueByWeek',
                accessor: 'rfccPlanned',
                Header: 'Piping RFC',
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
                width: 935,
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
        gardenKey: drcGardenKeys.defaultGardenKey,
        itemKey: 'name',
        type: 'virtual',
        fieldSettings: fieldSettings,
        customViews: {
            customItemView: ReleaseControlGardenItem,
            customGroupView: ReleaseControlGardenGroupView,
        },
        highlightColumn: getHighlightedColumn,
        itemWidth: () => 150,
        rowHeight: 25,
    });

    request.registerPresets([
        {
            name: 'HT cables',
            type: 'garden',
            filter: {
                filterGroups: [
                    {
                        name: 'Switchboard',
                        values: [null, ''],
                    },
                    {
                        name: 'Circuit',
                        values: [null, ''],
                    },
                ],
            },
            garden: {
                gardenKey: drcGardenKeys.electroGardenKey,
                groupByKeys: ['heatTraces'],
            },
        },
        {
            name: 'Pipetest',
            type: 'garden',
            filter: {
                filterGroups: [],
            },
            garden: {
                gardenKey: drcGardenKeys.defaultGardenKey,
            },
        },
    ]);

    request.registerStatusItems(statusBarConfig);
}
