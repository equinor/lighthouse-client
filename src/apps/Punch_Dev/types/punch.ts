export type PunchStatus = 'Open' | 'Closed' | 'Cleared not verified';

export type Punch = {
    facility: string | null;
    project: string | null;
    punchItemNo: string;
    checklistId: string | null;
    description: string | null;
    category: string | null;
    raisedBy: string | null;
    cleardBy: string | null;
    dueDate: string;
    sorting: string | null;
    type: string | null;
    priority: string | null;
    status: PunchStatus;
    isOpen: string | null;
    hasWO: boolean | null;
    isOverdue: string | null;
    estimate: number | null;
    workOrderNo: string | null;
    workOrderId: string | null;
    originalWorkOrderNo: string | null;
    softwareChangeRecordNo: string | null;
    documentNo: string | null;
    externalItemNo: string | null;
    materialRequired: boolean | null;
    materialEstimatedTimeOfArrival: string;
    externalMaterialNo: string | null;
    clearedAtDate: string;
    rejectedAtDate: string | null;
    verifiedAtDate: string;
    createdDate: string;
    formularGroup: string | null;
    formularType: string | null;
    formularDiscipline: string | null;
    tagId: string | null;
    tagNo: string | null;
    discipline: string | null;
    disciplineDescription: string | null;
    responsible: string | null;
    callOffNo: string | null;
    packageNo: string | null;
    commissioningPackageNo: string | null;
    tagArea: string | null;
    commissioningPackageId: string | null;
    identifier: string | null;
    commissioningPackageArea: string | null;
    system: string | null;
    mechanicalCompletionPackageNo: string | null;
    mechanicalCompletionPackageId: string | null;
    mechanicalCompletionStatus: string | null;
    handoverPlan: string;
    m03_PlannedForecastDate: Date | null;
};
