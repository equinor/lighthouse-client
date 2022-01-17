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
    plant: string;
    plantName: string;
    projectName: string;
    woNo: string;
    woId: string;
    commPkgNo: string;
    title: string;
    description: string;
    mileStoneCode: string;
    milestoneDescription: string;
    materialStatusCode: string;
    categoryCode: string;
    holdByCode: string;
    responsibleCode: string;
    responsibleDescription: string;
    areaCode: string;
    areaDescription: string;
    jobStatusCode: string;
    typeOfWorkCode: string;
    onShoreOffShoreCode: string;
    woTypeCode: string;
    projectProgress: string;
    expendedManHours: string;
    estimatedManHours: string;
    remainingManHours: string;
    plannedStartAtDate: string;
    actualStartAtDate: string;
    plannedFinishedAtDate: string;
    actualFinishAtDate: string;
    createdAt: string;
    lastUpdated: string;
    disciplineDescription: string;
    jobStatusCutoffs: {
        status: string;
        weeks: string[];
    }[];
};
export type WorkOrderApi = {
    items: WorkOrder[];
};
