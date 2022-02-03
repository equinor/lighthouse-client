export type JobStatuses = {
    status: string;
    weekUpdated: Date;
};
export type Job = {
    discipline: string;
    disciplineDescription: string;
    job: string;
    jobName: string;
    jobStatus: string;
    jobEstimatedHours: number;
    jobStatuses: JobStatuses[];
};
export type WorkOrder = {
    actualCompletionDate: string;
    actualStartupDate: string | null;
    category: string;
    commissioningPackageNo: string;
    createdDate: string;
    description: string | null;
    discipline: string;
    earnedManHours: string | null;
    estimatedManHours: string | null;
    expendedManHours: string | null;
    facility: string;
    holdBy: string;
    isVoided: boolean;
    jobStatus: string;
    jobStatusCutoffs: {
        status: string;
        weeks: string[];
    }[];
    location: string;
    materialStatus: string;
    milestone: string;
    onshoreOffshore: string;
    plannedCompletionDate: string;
    plannedStartupDate: string;
    project: string | null;
    projectProgress: string;
    remainingManHours: string | null;
    responsible: string;
    sourceIdentity: string;
    subMilestone: string;
    title: string;
    typeOfWork: string;
    updatedDate: string;
    workOrderNo: string;
    workOrderType: string;
};
export type WorkOrderApi = {
    items: WorkOrder[];
};
