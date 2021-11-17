import { useCallback, useEffect, useState } from 'react';
import { FilterItem } from '../Types/FilterItem';
import { useFilter } from './useFilter';

export function useCount({ type, value, checked }: FilterItem): {
    count: number;
    isActive: boolean;
} {
    const { filteredData, options, isLoading } = useFilter();
    const [count, setCount] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(true);
    const data = filteredData as Record<string, unknown>[];

    const updateCount = useCallback(() => {
        const getGroupeValue =
            options && options.groupValue && options.groupValue[type];

        const currentCount = data.filter((item) =>
            getGroupeValue
                ? getGroupeValue(item) === value
                : item[type] === value
        )?.length;

        setCount((oldCount) => {
            if (!checked) {
                setIsActive(true);
                return oldCount === 0 ? currentCount : oldCount;
            }

            if (currentCount > 0) {
                setIsActive(true);
                return currentCount;
            }

            if (isLoading) return oldCount;
            if (currentCount === 0) {
                setIsActive(false);
            }

            return currentCount;
        });
    }, [checked, data, type, value, isLoading]);

    useEffect(() => {
        updateCount();
    }, [data, isLoading]);

    // const isActive = useMemo(
    //     () => count === 0 && checked && !isLoading,
    //     [count, checked, isLoading]
    // );
    return { count, isActive };
}

// count > 0 && checked === true
// count === 0 && !checked === true
// count === 0 && checked && isLoading === true
