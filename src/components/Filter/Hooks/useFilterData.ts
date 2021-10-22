import { useCallback, useEffect, useState } from 'react';
import { createFilterData } from '../Services/creatFilterData';
import {
    FilterData,
    FilterDataOptions,
    FilterGroup,
    FilterItem,
    FilterItemCheck
} from '../Types/FilterItem';
import { dictToArray } from '../Utils/dictToArray';

export function useFilterData<T>(
    data: T[],
    options?: FilterDataOptions<T>
): { filter: FilterGroup[]; filterItemCheck: FilterItemCheck } {
    const [filterData, setFilterData] = useState<FilterData>({});

    useEffect(() => {
        setFilterData(createFilterData(data, options));
    }, [data, options]);

    const filterItemCheck: FilterItemCheck = useCallback(
        (filterItem: FilterItem, singleClick?: boolean): void => {
            setFilterData((filterState) => {
                if (singleClick) {
                    Object.keys(filterState[filterItem.type].value).forEach(
                        (key) => {
                            filterState[filterItem.type].value[key].checked =
                                key === filterItem.value ? true : false;
                        }
                    );
                } else {
                    filterState[filterItem.type].value[
                        filterItem.value
                    ].checked =
                        !filterState[filterItem.type].value[filterItem.value]
                            .checked;
                }
                return filterState;
            });
        },
        [filterData, data]
    );

    return { filter: dictToArray(filterData), filterItemCheck };
}
