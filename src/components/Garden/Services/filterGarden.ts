import { FilterData } from '../../Filter/Types/FilterItem';

export function filterGarden<T>(data: T[], filter: FilterData): T[] {
    const newData = data.filter((item) => {
        let isDisplay = true;
        Object.keys(item).forEach((key) => {
            if (filter[key] && !filter[key].value[item[key]].checked) {
                isDisplay = false;
            }
        });
        return isDisplay;
    });
    return newData;
}
