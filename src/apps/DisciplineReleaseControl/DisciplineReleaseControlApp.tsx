import { ClientApi } from '@equinor/portal-client';
import styled from 'styled-components';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import { getPipetestStatus, sortPipetestChecklist, sortPipetests } from './Functions/statusHelpers';
import { WorkflowStep } from './Types/disciplineReleaseControl';
import { Checklist, Pipetest, PipetestStatus } from './Types/Pipetest';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<Pipetest>({
        // CustomSidesheet: ReleaseControlSidesheet,
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
        let json = JSON.parse(await response.text());
        // json = json.splice(0, 2);
        // const inc: any = json.find(x => x.name === '9202-L401');
        // const json2 : [] = [];
        // json2.push(inc);
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
        // initialFilters: ['status'],
    });

    request.registerTableOptions({
        objectIdentifierKey: 'name',
        columnOrder: ['name', 'status'],
        hiddenColumns: [],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Pipetest', width: 200 },
            { key: 'status', title: 'Status', width: 400 },
            { key: 'checkLists', title: 'HT' },
            // { key: 'workflowSteps', title: 'Workflow' },
        ],
        customCellView: [
            {
                key: 'checkLists',
                type: {
                    Cell: ({ cell }: any) => {
                        let htList = '';
                        cell.value.content.checkLists
                            .filter((x) => x.isHeatTrace)
                            .forEach((ht: Checklist) => {
                                htList !== '' ? (htList += ', ') : null;
                                htList += ht.tagNo;
                            });
                        return htList;
                    },
                },
            },
            // {
            //     key: 'createdAtUtc',
            //     type: 'Date',
            // },
            // {
            //     key: 'workflowSteps',
            //     type: {
            //         Cell: ({ cell }: any) => {
            //             return (
            //                 <div>
            //                     <WorkflowCompact
            //                         steps={cell.value.content.workflowSteps}
            //                         statusDotFunc={statusDotFunc}
            //                         spanDirection={'horizontal'}
            //                         dotSize={15}
            //                     />
            //                 </div>
            //             );
            //         },
            //     },
            // },
            // {
            //     key: 'checklists',
            //     type: {
            //         Cell: ({ cell }: any) => {
            //             return (
            //                 <div>
            //                     <WorkflowCompact
            //                         steps={createChecklistSteps(cell.value.content.checklists)}
            //                         statusDotFunc={checklistTagFunc}
            //                         spanDirection={'horizontal'}
            //                         dotSize={30}
            //                         ellipseDot={true}
            //                     />
            //                 </div>
            //             );
            //         },
            //     },
            // },
        ],
    });

    request.registerGardenOptions({ gardenKey: 'status', itemKey: 'name' });

    const statusDotFunc = (item: WorkflowStep) => {
        if (item.isCurrent) {
            return 'Active';
        }

        switch (item.isCompleted) {
            case true:
                return 'Completed';

            case false:
                return 'Inactive';
        }
    };
}

// function createChecklistSteps(data: Checklist[]): Checklist[] {
//     const allWorkflowSteps = ['#B', '#T', '#C', '#H', '#X', '#Z', '#M'];
//     const workflowSteps: Checklist[] = [];
//     for (let i = 0; i < allWorkflowSteps.length; i++) {
//         const foundStep = data.find((x) => x.tagNo.substring(0, 2) === allWorkflowSteps[i]);
//         if (foundStep !== undefined) {
//             foundStep.workflowStepText = foundStep?.tagNo.substring(0, 2);
//             workflowSteps.push(foundStep);
//         } else {
//             workflowSteps.push({
//                 tagNo: allWorkflowSteps[i],
//                 responsible: '',
//                 formType: '',
//                 status: '',
//                 commPk: '',
//                 mcPk: '',
//                 mcStatus: 'Inactive',
//                 workflowStepText: allWorkflowSteps[i].substring(0, 2),
//             });
//         }
//     }

//     return workflowSteps;
// }
