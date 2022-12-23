export interface CommissioningPackage {
    BluelineStatus: unknown | null;
    CommPkgNo: string;
    CommStatus: string;
    CommissioningHandoverStatus: string;
    Description: string;
    Id: number;
    IsDecommissioning: boolean;
    IsVoided: boolean;
    McPkgCount: number;
    McPkgsAcceptedByCommissioning: number;
    McPkgsAcceptedByOperation: number;
    McStatus: string;
    OperationHandoverStatus: string;
    System: string;
    SystemId: number;
    YellowlineStatus: unknown | null;
}

export const CommPkgProperty = 'McPkgsThroughScope__CommPkg__CommPkgNo';
export const CommPkgDescriptionFromTag = 'McPkgsThroughScope__CommPkg__Description';
