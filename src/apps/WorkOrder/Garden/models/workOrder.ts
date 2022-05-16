// export type WorkOrder = {
//     projectIdentifier: string;
//     workOrderNumber: string;
//     description: string;
//     disciplineCode: string;
//     discipline: string;
//     responsibleCode: string;
//     responsible: string;
//     milestone: string;
//     milestoneCode: string;
//     onshore: boolean;
//     offshore: boolean;
//     materialStatus: string;
//     plannedStartDate: string;
//     plannedFinishDate: string;
//     w1ActualDate: string;
//     w2ActualDate: string;
//     w3ActualDate: string;
//     w4ActualDate: string;
//     w5ActualDate: string;
//     w6ActualDate: string;
//     w7ActualDate: string;
//     w8ActualDate: string;
//     w9ActualDate: string;
//     w10ActualDate: string;
//     commpkgNumber: string;
//     workOrderId: string;
//     proCoSysSiteName: string;
//     materialComments: string;
//     constructionComments: string;
//     projectProgress: string;
//     estimatedHours: number;
//     remainingHours: number;
//     expendedHours: number;
//     url: string;
//     order: number;
//     hourType: string;
//     mccrStatus: string;
//     holdBy: string;
//     holdByDescription: string;
//     date: string;
//     rowKey: string;
//     searchableValues: string;
//     projectDescription: string;
//     jobStatus: string;
// };

export type WorkOrder = {
    commpkgNumber: string | null;
    constructionComments: string | null;
    description: string | null;
    discipline: string | null;
    disciplineCode: string | null;
    estimatedHours: string | null;
    expendedHours: string | null;
    holdBy: string | null;
    holdByDescription: string | null;
    jobStatus: string | null;
    materialComments: string | null;
    materialStatus: string | null;
    mccrStatus: string | null;
    milestone: string | null;
    milestoneCode: string | null;
    plannedFinishDate: string | null;
    plannedStartupDate: string | null;
    projectDescription: string | null;
    projectIdentifier: string | null;
    projectProgress: string | null;
    remainingHours: string | null;
    responsible: string | null;
    responsibleCode: string | null;
    w1ActualDate: string | null;
    w2ActualDate: string | null;
    w3ActualDate: string | null;
    w4ActualDate: string | null;
    w5ActualDate: string | null;
    w6ActualDate: string | null;
    w7ActualDate: string | null;
    w8ActualDate: string | null;
    w9ActualDate: string | null;
    w10ActualDate: string | null;
    workOrderId: string | null;
    workOrderNumber: string;
};
