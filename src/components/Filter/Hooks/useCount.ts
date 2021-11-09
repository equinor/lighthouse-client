import { useEffect, useState } from 'react';
import { FilterItem } from '../Types/FilterItem';
import { useFilter } from './useFilter';

export function useCount({ type, value, checked }: FilterItem): number {
    const { filteredData, options } = useFilter();
    const [count, setCount] = useState<number>(0);
    const data = filteredData as Record<string, unknown>[];

    useEffect(() => {
        if (!checked) return;

        const getGroupeValue =
            options && options.groupValue && options.groupValue[type];

        setCount(
            data.filter((item) =>
                getGroupeValue
                    ? getGroupeValue(item) === value
                    : item[type] === value
            )?.length
        );
    }, [data, type, value]);

    return count;
}
