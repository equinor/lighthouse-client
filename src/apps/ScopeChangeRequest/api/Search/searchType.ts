import { ProcoSysTypes } from '../../sTypes/ProCoSys/ProCoSysTypes';
import { StidTypes } from '../../sTypes/STID/STIDTypes';

interface SelectOption {
    label: string;
    value: string;
}
export interface TypedSelectOption extends SelectOption {
    type: ProcoSysTypes | StidTypes;
    searchValue: string;
    object: unknown;
}
