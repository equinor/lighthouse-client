import { FilterValueType } from '../../Types';

export function searchByValue(items: string[], value: string) {
    return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
}
export const DEFAULT_NULL_VALUE = '(Blank)';
export function convertFromBlank(name: FilterValueType) {
    return name === DEFAULT_NULL_VALUE ? null : name;
}
