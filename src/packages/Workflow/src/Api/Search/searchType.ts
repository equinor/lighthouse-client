import { ReferenceType } from '@equinor/Workflow';

interface SelectOption {
    label: string;
    value: string;
}
export interface TypedSelectOption extends SelectOption {
    type: ReferenceType;
    searchValue: string;
    object: unknown;
    metadata?: string;
    temp?: unknown[];
}
