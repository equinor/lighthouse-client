import { useFiltering } from '..';
import { FilterDataOptions } from '../Types/FilterItem';
import { Context, FilterProviderProps } from './FilterContext';

export function FilterProvider<T>({
    children,
    initialData,
    options,
}: FilterProviderProps<T>): JSX.Element {
    const filter = useFiltering(initialData, options);

    return (
        <Context.Provider
            value={{ ...filter, filterOptions: filter.filterOptions as FilterDataOptions<unknown> }}
        >
            {children}
        </Context.Provider>
    );
}
