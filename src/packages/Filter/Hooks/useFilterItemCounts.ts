import { useEffect, useRef } from 'react';
import { FilterItem } from '../Components/FilterItem/FilterItem';
import { FilterValueType } from '../Types';
import { FilterGroup } from './useFilterApi';
import { useFilterApiContext } from './useFilterApiContext';

interface QueueItem {
    filterGroup: FilterGroup;
    filterItem: FilterValueType;
    callback: (count: number) => void;
}

export interface FilterItemCounts {
    getCount: (filterGroup: FilterGroup, filterValue: FilterValueType) => number;
    isCounted: (filterGroupName: string, item: FilterValueType) => boolean;
    addToQueue: (
        FilterGroup: FilterGroup,
        filterValue: FilterValueType,
        callback: (count: number) => void
    ) => void;
    removeFromQueue: (groupName: string, filterValue: FilterValueType) => void;
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

    function queueHandler(): void {
        setTimeout(() => {
            if (queue.current.length === 0) return;
            timeOutHandler();
        }, 1000);
    }

    function timeOutHandler() {
        if (queue.current.length === 0) {
            queueHandler();
            return;
        }
        queue.current.length > 0 && console.log('Queue length', queue.current.length);
        handleQueueItem(queue.current[0]);
        queueHandler();
    }

    /**@queue
     *
     *
     */
    const queue = useRef<QueueItem[]>([]);

    const handleQueueItem = ({ callback, filterGroup, filterItem }: QueueItem) => {
        callback(getCountForSingleValue(filterGroup, filterItem));
        removeFromQueue(filterGroup.name, filterItem);
    };

    const appendToQueue = (item: QueueItem) => queue.current.push(item);

    const removeFromQueue = (groupName: string, item: FilterValueType) => {
        console.log('removed item');
        queue.current = queue.current.filter(
            ({ filterGroup, filterItem }) => filterGroup.name !== groupName && item !== filterItem
        );
    };

    function addToQueue(
        filterGroup: FilterGroup,
        filterValue: FilterValueType,
        callback: (count: number) => void
    ) {
        if (!isCounted(filterGroup.name, filterValue)) {
            console.log('Queue item added');
            appendToQueue({ callback, filterGroup, filterItem: filterValue });
            if (queue.current.length === 1) queueHandler();
        } else {
            console.log('is counted');
            callback(getCountForSingleValue(filterGroup, filterValue));
        }
    }

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
        addToQueue,
        removeFromQueue,
    };
};
