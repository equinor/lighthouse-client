import { useEffect, useRef } from 'react';
import { useRefresh } from '../../../components/ParkView/hooks/useRefresh';
import { FilterValueType } from '../Types';
import { FilterGroup } from './useFilterApi';
import { useFilterApiContext } from './useFilterApiContext';

export interface FilterItemCounts {
    getCount: (filterGroup: FilterGroup, filterValue: FilterValueType) => number;
    isCounted: (filterGroupName: string, item: FilterValueType) => boolean;
}

export const useFilterItemCounts = (): FilterItemCounts => {
    const {
        filterGroupState: { getCountForFilterValue },
        filterState: { getFilterState },
    } = useFilterApiContext();

    const countMap = useRef(new Map<string, number>());

    const oldFilterState = useRef(getFilterState());
    console.log(oldFilterState);

    compareFilterStates();

    /** Invalidate count cache if filter state changes, just make a damn observable */
    function compareFilterStates() {
        if (oldFilterState.current.length !== getFilterState().length) {
            console.log('All counts cleared');
            countMap.current = new Map<string, number>();
            oldFilterState.current = getFilterState();
            return;
        }
    }

    function getCountForSingleValue(
        filterGroup: FilterGroup,
        filterValue: FilterValueType
    ): number {
        const itemCount = countMap.current.get(`${filterGroup.name}${filterValue?.toString()}`);
        if (itemCount) {
            console.log('got count from cache');
            return itemCount;
        }

        const newCount = getCountForFilterValue(filterGroup, filterValue);
        countMap.current.set(`${filterGroup.name}${filterValue?.toString()}`, newCount);
        console.log('New count');
        console.log(countMap.current.size);
        return newCount;
    }

    function isCounted(filterGroupName: string, item: FilterValueType) {
        return typeof findCount(filterGroupName, item) === 'number';
    }

    /**
     * @internal
     */
    function findCount(groupName: string, item: FilterValueType) {
        return countMap.current.get(`${groupName}${item?.toString()}`);
    }

    return {
        getCount: getCountForSingleValue,
        isCounted: isCounted,
    };
};
