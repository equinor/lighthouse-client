interface SelectOption {
    label: string;
    value: string;
}
export interface TypedSelectOption extends SelectOption {
    type: ReferenceType;
    searchValue: string;
    object: unknown;
    metadata?: string;
}

export type ReferenceType = ProcoSysTypes;

export type ProcoSysTypes =
    | PCSOrigins
    | 'tag'
    | 'commpkg'
    | 'system'
    | 'person'
    | 'area'
    | 'discipline'
    | 'functionalRole'
    | 'batchTag';

export type PCSOrigins = 'Query' | 'NCR' | 'SWCR';
