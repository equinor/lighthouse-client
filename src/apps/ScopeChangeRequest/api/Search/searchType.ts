import { ReferenceType } from '../../hooks/Search/useReferencesSearch';

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
