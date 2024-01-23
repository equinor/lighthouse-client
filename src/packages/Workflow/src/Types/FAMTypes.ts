export type FamTag = {
    facility: string;
    project: string;
    tagNo: string;
    tagId: string;
    tagUrlId: string | null;
    register: string | null;
    function: string | null;
    functionalSystem: string | null;
    mechanicalCompletionPackageNo: string;
    mechanicalCompletionPackageId: string;
    mechanicalCompletionPackageUrlId: string | null;
    commissioningPackageNo: string;
    commissioningPackageId: string;
    commissioningPackageUrlId: string | null;
    status: string | null;
    location: string | null;
    openWorkOrders: string | null;
    openWorkOrderIds: string | null;
    installedCableLength: string | null;
    estimatedCableLength: string | null;
    heatedTagNos: string | null;
    tagMountedOn: string | null;
    tagMountedOnNo: string | null;
    tagMountedOnUrlId: string | null;
    relatedHTCables: string | null;
    mountedOnHeatTracingCableTagNos: string | null;
    heatTracingCableTagNos: string | null;
    switchBoardTagNos: string | null;
    circuitAndStarterTagNos: string | null;

    isoDrawings: Drawing[];
    pidDrawings: Drawing[];

    //Sent to release control api
    area: string | null;
    tagType: string | null;
    system: string | null;
    mountedOn: string | null;
    circuitTagNos: string | null;
    tagHeated: string | null;
};

export type FamTagType = {
    facility: string;
    project: string;
    tagNo: string;
    tagId: string;
    tagUrlId: string | null;
    register: string | null;
    function: string | null;
    functionalSystem: string | null;
    mechanicalCompletionPackageNo: string;
    mechanicalCompletionPackageId: string;
    mechanicalCompletionPackageUrlId: string | null;
    commissioningPackageNo: string;
    commissioningPackageId: string;
    commissioningPackageUrlId: string | null;
    status: string | null;
    location: string | null;
    openWorkOrders: string | null;
    openWorkOrderIds: string | null;
    installedCableLength: string | null;
    estimatedCableLength: string | null;
    heatedTagNos: string | null;
    tagMountedOn: string | null;
    tagMountedOnNo: string | null;
    tagMountedOnUrlId: string | null;
    relatedHTCables: string | null;
    mountedOnHeatTracingCableTagNos: string | null;
    heatTracingCableTagNos: string | null;
    switchBoardTagNos: string | null;
    circuitAndStarterTagNos: string | null;

    isoDrawings?: Drawing[];
    pidDrawings?: Drawing[];

    //Sent to release control api
    area: string | null;
    tagType: string | null;
    system: string | null;
    mountedOn: string | null;
    circuitTagNos: string | null;
    tagHeated: string | null;
};

export interface Drawing {
    docNo: string;
    docTitle: string;
    docType: string;
}

export interface PunchListItem {
    punchItemNo: number;
    description: string;
}

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
    workOrderUrlId: string | null;
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
