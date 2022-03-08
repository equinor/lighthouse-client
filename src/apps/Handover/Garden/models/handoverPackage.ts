export type HandoverPackageStatus =
    | 'PA'
    | 'PB'
    | 'RFOC Accepted'
    | 'RFOC Sent'
    | 'RFOC Rejected'
    | 'TAC Accepted'
    | 'TAC Sent'
    | 'TAC Rejected'
    | 'RFCC Rejected'
    | 'RFCC Accepted'
    | 'RFCC Sent'
    | 'DCC'
    | 'RFRC'
    | 'OS'
    | 'No status'
    | 'OK';

export type HandoverPackage = {
    actualFinishDate: string;
    actualStartDate: string;
    area: string;
    commpkgNo: string;
    commpkgStatus: HandoverPackageStatus;
    createdDate: string;
    demolitionActualFinishDate: string;
    demolitionActualStartDate: string;
    demolitionDCCAcceptedDate: string;
    demolitionForecastFinishDate: string;
    demolitionForecastStartDate: string;
    demolitionPlannedFinishDate: string;
    demolitionPlannedStartDate: string;
    demolitionRFRCShippedDate: string;
    description: string;
    forecastFinishDate: string;
    forecastStartDate: string;
    forecastTacDate: string;
    hasMaintenanceProgram: boolean;
    hasOperationAgreement: boolean;
    hasUnsignedActions: boolean;
    hasYellowLineMarkup: boolean;
    hasBlueLineMarkup: boolean;
    id: string;
    isDemolition: boolean;
    isInOperation: boolean;
    isReadyForStartup: boolean;
    isSubsea: boolean;
    mcDisciplineCodes: string[];
    mcDisciplines: string[];
    mcPkgsCount: number;
    mcPkgsRFCCShippedCount: number;
    mcPkgsRFCCSigned: number;
    mcPkgsRFOCShipped: number;
    mcPkgsRFOCSigned: number;
    mcStatus: HandoverPackageStatus;
    phase: string;
    plannedFinishDate: string;
    plannedStartDate: string;
    plannedTacDate: string;
    priority1: string;
    priority2: string;
    priority3: string;
    priority1Description: string;
    priority2Description: string;
    priority3Description: string;
    progress: string;
    projectIdentifier: string;
    projectDescription: string;
    remark: string;
    responsible: string;
    rfccIsAccepted: boolean;
    rfccIsRejected: boolean;
    rfccIsShipped: boolean;
    rfccShippedDate: string;
    rfocActualDate: string;
    rfocForecastDate: string;
    rfocIsAccepted: boolean;
    rfocIsRejected: boolean;
    rfocIsShipped: boolean;
    rfocPlannedDate: string;
    rfocShippedDate: string;
    rowKey: string;
    siteCode: string;
    subSystem: string;
    system: string;
    tacActualDate: string;
    tacIsAccepted: boolean;
    tacIsRejected: boolean;
    tacIsShipped: boolean;
    url: string;
    volume: number;
    yellowLineStatus: string;
    blueLineStatus: string;
};
