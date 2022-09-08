import { FilterOptions } from '../Types';

export const shouldFilter = <T extends Record<PropertyKey, unknown>>(
    options: FilterOptions<T>
): boolean =>
    options.some(
        ({ defaultUncheckedValues }) => defaultUncheckedValues && defaultUncheckedValues.length > 0
    );
