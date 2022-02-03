export type WorkOrder = {
    actualCompletionDate: string | null;
    actualStartupDate: string | null;
    category: string | null;
    commissioningPackageNo: string | null;
    createdDate: string | null;
    description: string | null;
    discipline: string | null;
    earnedManHours: string | null;
    estimatedManHours: string | null;
    expendedManHours: string | null;
    facility: string | null;
    holdBy: string | null;
    isVoided: boolean;
    jobStatus: string | null;
    jobStatusCutoffs: {
        status: string;
        weeks: string[];
    }[];
    location: string | null;
    materialStatus: string | null;
    milestone: string | null;
    onshoreOffshore: string | null;
    plannedCompletionDate: string | null;
    plannedStartupDate: string | null;
    project: string | null;
    projectProgress: string | null;
    remainingManHours: string | null;
    responsible: string | null;
    sourceIdentity: string | null;
    subMilestone: string | null;
    title: string | null;
    typeOfWork: string | null;
    updatedDate: string | null;
    workOrderNo: string;
    workOrderType: string | null;
};
