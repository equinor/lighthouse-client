import JSONfn from 'json-fn';
import { FilterOptions } from '../Types/FilterItem';

export type GrouperFunctions = Record<string, (item: unknown) => string>;

export function parseGroupValueFunctions(groupValue?: string): GrouperFunctions {
    return groupValue && JSONfn.parse(groupValue);
}

export function groupValueTopString<T>(options?: FilterOptions<T>): string | undefined {
    return options && JSONfn.stringify(options.groupValue);
}
