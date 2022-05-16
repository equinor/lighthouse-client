import { tokens } from '@equinor/eds-tokens';
import { ResolverFunction } from '@equinor/lighthouse-functions';
import { SidesheetComponentManifest, SidesheetWidgetManifest } from '@equinor/lighthouse-widgets';
import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { getGardenItemColor } from './Components/Garden/gardenFunctions';
import {
    drcGardenKeys,
    fieldSettings,
    getHighlightedColumn
} from './Components/Garden/gardenSetup';
import ReleaseControlGardenGroupView from './Components/Garden/ReleaseControlGardenGroupView';
import ReleaseControlGardenItem from './Components/Garden/ReleaseControlGardenItem';
import { ReleaseControlHTSidesheet } from './Components/Sidesheet/ReleaseControlHTSidesheet';
import { GatewaySidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    StepFilterContainer,
    StepFilterText,
    WorkflowFilterDot
} from './Components/Workflow/Components/WorkflowFilterDot';
import { WorkflowWarningTriangle } from './Components/Workflow/Components/WorkflowWarningTriangle';
import { CurrentStepContainer } from './Components/Workflow/Styles/styles';
import { chewPipetestDataFromApi, getYearAndWeekFromString } from './Functions/statusHelpers';
import {
    checklistTagFunc,
    createChecklistSteps,
    getHTList,
    getStatusLetterFromStatus
} from './Functions/tableHelpers';
import { Monospace } from './Styles/Monospace';
import { Pipetest } from './Types/pipetest';

export const ReleaseControlHTSidesheetWidgetManifest: SidesheetWidgetManifest = {
    widgetId: 'ht',
    widgetType: 'sidesheet',
    color: '#7B3A96',
    props: {
        resolverId: 'htResolver',
        objectIdentifier: 'name',
    },
};

export const ReleaseControlHTSidesheetWidgetComponent: SidesheetComponentManifest = {
    widgetId: 'ht',
    widgetType: 'sidesheet',
    widget: ReleaseControlHTSidesheet,
};

export const changeFunction: ResolverFunction<{ test: string }> = {
    functionId: 'changeResolver',
    function: () => {
        return { test: '' };
    },
    type: 'idResolver',
};

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
            CustomGroupeSidesheet: ReleaseControlHTSidesheet,
            objectIdentifier: 'name',
            defaultTab: 'garden',
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

                        map.set('unknown', 0);
                        map.set('pressuretest', 1);
                        map.set('chemicalcleaning', 2);
                        map.set('hotoilflushing', 3);
                        map.set('bolttensioning', 4);
                        map.set('painting', 5);
                        map.set('a-test', 6);
                        map.set('insulation', 7);
                        map.set('boxInsulation', 8);
                        map.set('b-test', 9);
                        map.set('marking', 10);
                        map.set('complete', 11);

                        if (typeof a !== 'string') return 0;
                        if (typeof b !== 'string') return 0;

                        return (map.get(a.toLowerCase()) ?? -0) - (map.get(b.toLowerCase()) ?? -0);
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
            },
            {
                name: 'Completion status',
                valueFormatter: ({ shortformCompletionStatus }) => shortformCompletionStatus,
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
            name: 'Electro',
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
            name: 'Default',
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
