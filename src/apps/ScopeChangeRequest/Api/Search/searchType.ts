import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { StidTypes } from '../../Types/STID/STIDTypes';

interface SelectOption {
    label: string;
    value: string;
}
export interface TypedSelectOption extends SelectOption {
    type: ProcoSysTypes | StidTypes;
    searchValue: string;
    object: unknown;
}
