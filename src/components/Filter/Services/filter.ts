import { FilterData, FilterDataOptions } from '../Types/FilterItem';

export function filter<T>(
    data: T[],
    filter: FilterData,
    options?: FilterDataOptions<T>
): T[] {
    return data.filter((item) => {
        let isPresent = true;
        /**
         * This may be overkill to be able to map filter names to other names than field in objects
         * This should maybe be mapped in the data object it self
         */
        if (options?.typeMap && Object.keys(options?.typeMap).length > 0) {
            Object.keys(options.typeMap).forEach((key) => {
                const filterKey: string =
                    options.typeMap && options.typeMap[key];
                if (
                    filter[filterKey] &&
                    !filter[filterKey].value[item[key]].checked
                ) {
                    isPresent = false;
                }
            });
        }

        if (!isPresent) return false;

        Object.keys(item).forEach((key) => {
            if (filter[key] && !filter[key].value[item[key]].checked) {
                isPresent = false;
            }
        });

        if (!isPresent) return false;

        if (
            options?.groupValue &&
            Object.keys(options?.groupValue).length > 0
        ) {
            Object.keys(options.groupValue).forEach((key) => {
                if (
                    options?.groupValue &&
                    typeof options.groupValue[key] === 'function'
                ) {
                    const valueKey = options?.groupValue[key](item);
                    if (filter[key] && !filter[key].value[valueKey].checked) {
                        isPresent = false;
                    }
                }
            });
        }

        return isPresent;
    });
}
