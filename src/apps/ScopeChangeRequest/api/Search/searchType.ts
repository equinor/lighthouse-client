import { ProcoSysTypes } from '../../types/ProCoSys/ProCoSysTypes';
import { StidTypes } from '../../types/STID/STIDTypes';

interface SelectOption {
    label: string;
    value: string;
}
export interface TypedSelectOption extends SelectOption {
    type: ProcoSysTypes | StidTypes;
    searchValue: string;
    object: unknown;
}
