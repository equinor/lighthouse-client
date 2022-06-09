export interface WorkOrder {
    projectIdentifier: string | null;
    workOrderNumber: string;
    description: string | null;
    disciplineCode: string | null;
    discipline: string | null;
    responsibleCode: string | null;
    responsible: string | null;
    milestoneCode?: any | null;
    mileStone?: string | null;
    materialStatus?: string | null;
    plannedStartupDate: string | null;
    plannedFinishDate: string | null;
    w1ActualDate?: string | null;
    w2ActualDate: Date | null;
    w3ActualDate: Date | null;
    w4ActualDate: Date | null;
    w5ActualDate?: string | null;
    w6ActualDate: string | null;
    w7ActualDate?: string | null;
    w8ActualDate?: string | null;
    w9ActualDate?: string | null;
    w10ActualDate?: string | null;
    commpkgNumber?: string | null;
    workOrderId: string;
    materialComments?: string | null;
    constructionComments?: string | null;
    projectProgress: number | null;
    estimatedHours: number | null;
    remainingHours: number | null;
    expendedHours?: string | null;
    mccrStatus?: string | null;
    holdBy: string | null;
    holdByDescription: string;
    jobStatus: string | null;
    facility: string | null;
    actualStartupDate: Date | null;
    actualCompletionDate: Date | null;
}
