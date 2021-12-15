import JSONfn from 'json-fn';
import { FilterDataOptions } from '../Types/FilterItem';

export type GrouperFunctions = Record<string, (item: unknown) => string>;

export function parseGroupValueFunctions(
    groupValue?: string
): GrouperFunctions {
    return groupValue && JSONfn.parse(groupValue);
}

export function groupValueTopString<T>(
    options?: FilterDataOptions<T>
): string | undefined {
    return options && JSONfn.stringify(options.groupValue);
}
