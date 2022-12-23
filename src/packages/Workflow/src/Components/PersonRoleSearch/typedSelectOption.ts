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

export type ReferenceType = ProcoSysTypes | StidTypes | FAMTypes | 'scopechangerequest';

export type StidTypes = 'document' | 'stidtag';

export type FAMTypes = 'punch' | 'famtag' | 'htcable' | 'famtagno' | 'htcabletagno';

export type ProcoSysTypes =
    | PCSOrigins
    | 'tag'
    | 'commpkg'
    | 'system'
    | 'person'
    | 'area'
    | 'discipline'
    | 'functionalRole'
    | 'batchTag'
    | 'mcpkg'
    | 'punch';

export type PCSOrigins = 'Query' | 'NCR' | 'SWCR';
