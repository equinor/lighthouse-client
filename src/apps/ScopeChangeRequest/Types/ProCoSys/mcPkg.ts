export interface MechanicalCompletionPackage extends BaseMechanicalCompletionPackage {
    Status: string;
    PhaseCode: null;
    PhaseDescription: null;
    ResponsibleCode: string;
    ResponsibleDescription: string;
    CommissioningHandoverStatus: string;
    OperationHandoverStatus: string;
}

export interface BaseMechanicalCompletionPackage {
    Id: number;
    McPkgNo: string;
    Description: string;
    CommPkgNo: string;
}
