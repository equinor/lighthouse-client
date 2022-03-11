import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import {
    getPipetestStatus,
    getPipetestStatusForStep,
    sortPipetestChecklist,
    sortPipetests,
} from './Functions/statusHelpers';
import { fieldSettings } from './Components/Garden/gardenSetup';
import { CheckListStatus, CheckListStepTag } from './Types/drcEnums';
import { CheckList, Pipetest } from './Types/Pipetest';
import { ReleaseControlGardenItem } from './Components/Garden/ReleaseControlGardenItem';

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

    const releaseControlExcludeKeys: (keyof Pipetest)[] = ['name', 'checkLists'];

    request.registerFilterOptions({
        excludeKeys: releaseControlExcludeKeys,
        typeMap: {},
        initialFilters: ['status', 'System'],
        groupValue: {
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
                //TODO own file
                Cell: (cell) => {
                    let htList = '';
                    const usedHts: string[] = [];
                    let htCount = 0;
                    cell.row.values.checkLists.content.checkLists
                        .filter((x) => x.isHeatTrace)
                        .forEach((ht: CheckList) => {
                            if (htCount < 3 && !usedHts.some((x) => x === ht.tagNo)) {
                                htList !== '' ? (htList += ', ') : null;
                                htList += ht.tagNo;
                            }
                            if (!usedHts.some((x) => x === ht.tagNo)) {
                                htCount = htCount += 1;
                            }
                            usedHts.push(ht.tagNo);
                        });
                    if (htCount > 3) {
                        htList += ' (+' + (htCount - 3).toString() + ')';
                    }
                    return htList;
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

    //TODO - move
    const checklistTagFunc = (item: CheckList) => {
        switch (item?.status) {
            case CheckListStatus.Inactive:
                return 'Inactive';
            case CheckListStatus.OK:
                return 'Completed';
            case CheckListStatus.PunchBError:
                return 'Completed';
            case CheckListStatus.Outstanding:
                return 'Outstanding';
            case CheckListStatus.PunchAError:
                return 'Error';
        }
        return 'Error';
    };
}

//TODO - move / refactor
function createChecklistSteps(data: CheckList[]): CheckList[] {
    const allWorkflowSteps = [
        CheckListStepTag.Bolttensioning,
        CheckListStepTag.PressureTest,
        CheckListStepTag.ChemicalCleaning,
        CheckListStepTag.HotOilFlushing,
        CheckListStepTag.Painting,
        CheckListStepTag.HtTest,
        CheckListStepTag.Insulation,
        CheckListStepTag.HtRetest,
        CheckListStepTag.Marking,
    ];
    const workflowSteps: CheckList[] = [];
    for (let i = 0; i < allWorkflowSteps.length; i++) {
        const foundSteps = data.filter((x) => x.tagNo.substring(0, 2) === allWorkflowSteps[i]);
        const htTestStep =
            allWorkflowSteps[i] === CheckListStepTag.HtTest ||
            allWorkflowSteps[i] === CheckListStepTag.HtRetest;
        const formularType =
            allWorkflowSteps[i] === CheckListStepTag.HtTest
                ? CheckListStepTag.HtTest
                : CheckListStepTag.HtRetest;
        if (foundSteps.length !== 0 && !htTestStep) {
            const workflowStep = foundSteps[0];
            workflowStep.status = getPipetestStatusForStep(foundSteps);
            workflowStep.workflowStepText = foundSteps[0]?.tagNo.substring(1, 2);
            workflowSteps.push(workflowStep);
        } else if (
            htTestStep &&
            data.some((x) => x.isHeatTrace) &&
            data.some((x) => x.formularType === formularType)
        ) {
            const foundTestSteps = data.filter((x) => x.formularType === formularType);
            const workflowStep = foundTestSteps[0];
            workflowStep.status = getPipetestStatusForStep(foundTestSteps);
            workflowStep.workflowStepText = formularType === CheckListStepTag.HtTest ? '1' : '2';
            workflowSteps.push(workflowStep);
        } else {
            workflowSteps.push({
                tagNo: allWorkflowSteps[i],
                responsible: '',
                formularType: '',
                formularGroup: '',
                status: CheckListStatus.Inactive,
                revision: '',
                test: '',
                isHeatTrace: false,
                workflowStepText: htTestStep
                    ? allWorkflowSteps[i] === CheckListStepTag.HtTest
                        ? '1'
                        : '2'
                    : allWorkflowSteps[i].substring(1, 2),
            });
        }
    }

    return workflowSteps;
}
