export interface WorkOrder {
    sourceIdentity: string;
    facility: string;
    project: string;
    workOrderNo: string;
    workOrderUrlId: string | null;
    title: string;
    description: string;
    plannedStartupDate: string;
    actualStartupDate: string;
    plannedCompletionDate: string;
    actualCompletionDate: string;
    commissioningPackageNo: string;
    milestone: string;
    category: string;
    holdBy: string;
    typeOfWork: string;
    onshoreOffshore: string;
    projectProgress: string;
    workOrderType: string;
    jobStatus: string;
    materialStatus: string;
    estimatedManHours: string;
    expendedManHours: string;
    remainingManHours: string;
    subMilestone: string;
    isVoided: true;
    responsible: string;
    location: string;
    discipline: string;
    createdDate: string;
    updatedDate: string;
}
