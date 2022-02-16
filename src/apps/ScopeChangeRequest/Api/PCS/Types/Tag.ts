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
    Sequence: null;
    MountedOnTagNo: null;
    Remark: null;
    SystemCode: null;
    SystemDescription: null;
    DisciplineCode: string;
    DisciplineDescription: string;
    AreaCode: null;
    AreaDescription: null;
    EngineeringCodeCode: string;
    EngineeringCodeDescription: string;
    ContractorCode: string;
    ContractorDescription: string;
    HasPreservation: false;
    PreservationMigrated: null;
    PurchaseOrderTitle: string;
}

export interface AdditionalField {
    Id: number;
    Label: string;
    Value: string;
    Type: string;
    Unit?: any;
}

export interface TagWrapper {
    Tag: Tag;
    AdditionalFields: AdditionalField[];
}
