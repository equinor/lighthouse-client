export type Workorder = {
    workorderId: string;
    checklistID: string | null;
    loopId: string | null;
    workOrderNo: string | null;
    facility: string | null;
    project: string | null;
    holdBy: string | null;
    plannedCompletionDate: Date | null;
    actualCompletionDate: Date | null;
    remainingManHours: number | null;
    estimatedManHours: number | null;
    projectProgress: number | null;
    responsibleDescription: string | null;
    responsible: string | null;
    title: string | null;
    description: string | null;
    discipline: string | null;
    disciplineDescription: string | null;
    jobStatus: string | null;
    materialStatus: string | null;
};
