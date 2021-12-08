import {
    PluginHook,
    useExpanded,
    useFilters,
    useFlexLayout,
    useGroupBy,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy,
} from 'react-table';
import { useSelector } from '../Components/Cell';
import { TableData } from '../types';

interface HooksOptions {
    rowSelect: boolean;
}

export function RegisterReactTableHooks<TData extends TableData>(
    options?: HooksOptions
): PluginHook<TData>[] {
    const hooks: Array<PluginHook<TData>> = [];

    hooks.push(
        useFlexLayout,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useResizeColumns
    );
    // TODO : disable checkboxes for whole table. conditional hook?
    options?.rowSelect && hooks.push(useSelector);

    return hooks;
}
