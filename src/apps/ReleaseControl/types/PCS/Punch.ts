export type Punch = {
    facility: string | null;
    punchItemNo: string;
    description: string | null;
    punchItemCategory: string | null;
    raisedByOrganization: string | null;
    clearingByOrganization: string | null;
    dueDate: Date | null;
    punchPriority: string | null;
    punchListType: string | null;
    punchListSorting: string | null;
    estimate: string | null;
    workOrderNo: string | null;
    materialRequired: string | null;
    materialEstimatedTimeOfArrival: string | null;
    externalMaterialNo: string | null;
    clearedAtDate: Date | null;
    rejectedAtDate: Date | null;
    verifiedAtDate: Date | null;
    updatedDate: Date | null;
    responsible: string | null;
    formularType: string | null;
    tagNo: string | null;
    callOffNo: string | null;
    mechanicalCompletionPackageNo: string | null;
    commissioningPackageNo: string | null;
    functionalSystem: string | null;
    c01PlannedDate: Date | null;
    c01ForecastDate: Date | null;
    c07PlannedDate: Date | null;
    c07ForecastDate: Date | null;
    priority1: string | null;
};