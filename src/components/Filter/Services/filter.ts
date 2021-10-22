import { FilterData } from '../Types/FilterItem';

export function filter<T>(data: T[], filter: FilterData): T[] {
    const newData = data.filter((item) => {
        let isPresent = true;
        Object.keys(item).forEach((key) => {
            if (filter[key] && !filter[key].value[item[key]].checked) {
                isPresent = false;
            }
        });
        return isPresent;
    });
    return newData;
}
