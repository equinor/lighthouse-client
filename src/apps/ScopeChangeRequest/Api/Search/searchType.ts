import { ProcoSysTypes } from './PCS/searchPcs';
import { StidTypes } from './STID/searchStid';

interface SelectOption {
    label: string;
    value: string;
}
export interface TypedSelectOption extends SelectOption {
    type: ProcoSysTypes | StidTypes;
    searchValue: string;
}
