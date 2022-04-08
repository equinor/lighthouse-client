import { FilterGroup } from '../../Hooks/useFilterApi';

export const createTypeKeys = (filter: FilterGroup[]) => filter.map(({ name }) => name).sort();
export function SearchFilterKeys(keys: string[], filerValue: string): string[] {
    return keys.filter((key) => key.toLowerCase().includes(filerValue.toLowerCase()));
}
