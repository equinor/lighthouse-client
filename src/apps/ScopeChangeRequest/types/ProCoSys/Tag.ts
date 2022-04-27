export interface SearchTag {
    TagNo: string;
    Id: string;
    Description: string;
    McPkgsThroughScope__CommPkg__CommPkgNo: string | null;
    Register__Id: string;
}
export interface Tag {
    Id: number;
    TagNo: string;
    Description: string;
    RegisterCode: string;
    RegisterDescription: string;
    StatusCode: string;
    StatusDescription: string;
    TagFunctionCode: string;
    TagFunctionDescription: string;
    CommPkgNo: string | null;
    McPkgNo: string | null;
    PurchaseOrderNo: string;
    CallOffNo: string;
    ProjectDescription: string;
    Sequence: unknown | null;
    MountedOnTagNo: unknown | null;
    Remark: unknown | null;
    SystemCode: unknown | null;
    SystemDescription: unknown | null;
    DisciplineCode: string;
    DisciplineDescription: string;
    AreaCode: unknown | null;
    AreaDescription: unknown | null;
    EngineeringCodeCode: string;
    EngineeringCodeDescription: string;
    ContractorCode: string;
    ContractorDescription: string;
    HasPreservation: false;
    PreservationMigrated: null;
    PurchaseOrderTitle: string;
}

export interface TagWrapper {
    Tag: Tag;
}
