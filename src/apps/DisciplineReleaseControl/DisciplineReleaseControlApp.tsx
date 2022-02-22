import { AnalyticsOptions } from '@equinor/Diagrams';
import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ReleaseControlProcessForm } from './Components/Form/ReleaseControlProcessForm';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import { DisciplineReleaseControl, WorkflowStep } from './Types/disciplineReleaseControl';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<DisciplineReleaseControl>({
        CustomSidesheet: ReleaseControlSidesheet,
        objectIdentifier: 'name',
    });

    request.registerDataCreator({
        title: 'Release control',
        component: ReleaseControlProcessForm,
    });

    request.registerDataSource(async () => {
        const { releaseControls } = httpClient();
        const response = await releaseControls.fetch(`/api/release-control-processes`);
        return JSON.parse(await response.text());
    });

    const scopeChangeExcludeKeys: (keyof DisciplineReleaseControl)[] = ['id'];

    request.registerFilterOptions({
        excludeKeys: scopeChangeExcludeKeys,
        typeMap: {},
    });

    request.registerTableOptions({
        objectIdentifierKey: 'title',
        columnOrder: ['title', 'description'],
        hiddenColumns: [
            'id',
            'sequenceNumber',
            'phase',
            'originSource',
            'originSourceId',
            'category',
            'estimatedChangeHours',
            'actualChangeHours',
            'guesstimateDescription',
            'guesstimateHours',
            'state',
            'isVoided',
            'hasComments',
            'currentWorkflowStep',
            'attachments',
            'systems',
            'commissioningPackages',
            'tags',
            'documents',
            'modifiedAtUtc',
            'modifiedBy',
            'createdBy',
            'areas',
            'disciplines',
        ],
        enableSelectRows: true,
        headers: [
            { key: 'title', title: 'Discipline release control (DRC)', width: 1000 },
            { key: 'description', title: 'Description' },
            { key: 'workflowSteps', title: 'Workflow' },
            { key: 'createdAtUtc', title: 'Created at' },
        ],
        customCellView: [
            {
                key: 'createdAtUtc',
                type: 'Date',
            },
            {
                key: 'workflowSteps',
                type: {
                    Cell: ({ cell }: any) => {
                        return (
                            <div>
                                <WorkflowCompact
                                    steps={cell.value.content.workflowSteps}
                                    statusDotFunc={statusDotFunc}
                                    spanDirection={'horizontal'}
                                    dotSize={15}
                                />
                            </div>
                        );
                    },
                },
            },
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

    request.registerGardenOptions({ gardenKey: 'title', itemKey: 'title' });
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

export const analyticsOptions: AnalyticsOptions<DisciplineReleaseControl> = {
    section1: {
        chart1: {
            type: 'barChart',
            options: {
                categoryKey: 'title',
                nameKey: 'title',
                stacked: true,
            },
        },
    },
};

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
