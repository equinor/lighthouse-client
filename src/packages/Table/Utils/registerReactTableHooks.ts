import {
    PluginHook,
    useColumnOrder,
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
import { TableData } from '../Types/types';

interface HooksOptions {
    rowSelect: boolean;
}

export function RegisterReactTableHooks<T extends TableData>(
    options?: HooksOptions
): PluginHook<T>[] {
    const hooks: Array<PluginHook<T>> = [];

    hooks.push(
        useFlexLayout,
        useFilters,
        useColumnOrder,
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
