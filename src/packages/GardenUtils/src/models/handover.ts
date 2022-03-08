export type HandoverChild = {
    commpkgId: string;
    url: string;
};
export type HandoverDetails = {
    nextToSign: string;
} & HandoverChild;

export type HandoverMcpkg = {
    mcPkgNo: string;
    description: string;
    mcStatus: string;
    rfccShippedActualDate: string;
    rfccAcceptedActualDate: string;
    rfocIsShipped: boolean;
    rfocIsAccepted: boolean;
    rfocIsRejected: boolean;
    rfccIsShipped: boolean;
    rfccIsAccepted: boolean;
    rfccIsRejected: boolean;
} & HandoverChild;

export type HandoverNCR = {
    documentNumber: string;
    title: string;
} & HandoverChild;

export type HandoverPunch = {
    tagNumber: string;
    status: string;
    description: string;
    toBeClearedBy: string;
    sorting: string;
} & HandoverChild;

export type HandoverQuery = {
    queryNumber: string;
    title: string;
    status: string;
    nextToSign: string;
} & HandoverChild;

export type HandoverSWCR = {
    swcrNumber: string;
    status: string;
    description: string;
    priority: string;
} & HandoverChild;

export type HandoverUnsignedAction = {
    actionNumber: string;
    title: string;
    description: string;
} & HandoverChild;

export type HandoverUnsignedTask = {
    taskNumber: string;
    title: string;
} & HandoverChild;

export type HandoverWorkOrder = {
    workOrderNumber: string;
    workOrderStatus: string;
    workOrderStatusDescription: string;
    description: string;
    materialStatus: string;
    materialStatusDescription: string;
    projectProgress: string;
} & HandoverChild;

export type HandoverResourceTypes =
    | HandoverMcpkg
    | HandoverWorkOrder
    | HandoverUnsignedTask
    | HandoverUnsignedAction
    | HandoverPunch
    | HandoverSWCR
    | HandoverNCR
    | HandoverQuery;

export type HandoverResourceTypeMap = {
    mcpkg: HandoverMcpkg;
    'work-orders': HandoverWorkOrder;
    'unsigned-tasks': HandoverUnsignedTask;
    'unsigned-actions': HandoverUnsignedAction;
    punch: HandoverPunch;
    swcr: HandoverSWCR;
    details: HandoverDetails;
    ncr: HandoverNCR;
    query: HandoverQuery;
};
