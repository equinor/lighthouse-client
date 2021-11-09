import {
    PluginHook,
    useExpanded,
    useFilters,
    useFlexLayout,
    useGroupBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy
} from 'react-table';
import { useSelector } from '../Components/Cell';

interface HooksOptions {
    rowSelect: boolean;
}

export function RegisterReactTableHooks<T>(options?: HooksOptions) {
    const hooks: PluginHook<Record<string, T>>[] = [];

    hooks.push(
        useFlexLayout,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useResizeColumns,
        useSelector
    );

    return hooks;
}
