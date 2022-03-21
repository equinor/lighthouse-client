import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import { getPipetestStatus, sortPipetestChecklist, sortPipetests } from './Functions/statusHelpers';
import { fieldSettings } from './Components/Garden/gardenSetup';
import { Pipetest } from './Types/pipetest';
import { ReleaseControlGardenItem } from './Components/Garden/ReleaseControlGardenItem';
import { checklistTagFunc, createChecklistSteps, getHTList } from './Functions/tableHelpers';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<Pipetest>({
        CustomSidesheet: ReleaseControlSidesheet,
        objectIdentifier: 'name',
    });

    request.registerDataCreator({
        title: 'Release control',
        component: ReleaseControlProcessForm,
    });

    // request.registerDataSource(async () => {
    //     const { releaseControls } = httpClient();
    //     const response = await releaseControls.fetch(`/api/release-control-processes`);
    //     return JSON.parse(await response.text());
    // });

    request.registerDataSource(async () => {
        const { FAM } = httpClient();
        const response = await FAM.fetch(`/v0.1/procosys/pipetest/JCA`);
        const json = JSON.parse(await response.text());
        json.map((pipetest: Pipetest) => {
            pipetest.checkLists = sortPipetestChecklist(pipetest.checkLists);
            pipetest.status = getPipetestStatus(pipetest.checkLists);
            return pipetest;
        });
        sortPipetests(json);
        return json;
    });

    const releaseControlExcludeKeys: (keyof Pipetest)[] = ['name'];

    request.registerFilterOptions({
        excludeKeys: releaseControlExcludeKeys,
        headerNames: {},
        defaultActiveFilters: ['status', 'System'],
        valueFormatter: {
            System: (item: Pipetest): string => {
                return item.name.substring(0, 2);
            },
        },
    });

    request.registerTableOptions({
        objectIdentifierKey: 'name',
        columnOrder: ['name', 'status'],
        hiddenColumns: [],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 200 },
            { key: 'status', title: 'Status', width: 300 },
            { key: 'checkLists', title: 'Process', width: 260 },
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
                id: 'htList',
                Header: 'Heattraces',
                Aggregated: () => null,
                width: 1700,
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
        intercepters: {
            preGroupFiltering: (data, key) =>
                key === 'checkLists'
                    ? data.reduce(
                        (prev, curr) => [
                            ...prev,
                            {
                                ...curr,
                                checkLists: curr.checkLists.filter(
                                    ({ isHeatTrace }) => isHeatTrace
                                ),
                            },
                        ],
                        [] as Pipetest[]
                    )
                    : data,
        },
    });
}
