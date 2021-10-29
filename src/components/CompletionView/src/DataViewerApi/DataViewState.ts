import { Atom } from '@dbeining/react-atom';
import { DataFetcher, DataViewerProps, ViewOptions } from './DataViewerTypes';

export interface DataViewState {
    [key: string]: ViewConfig<unknown>;
}

export interface ViewConfig<T> {
    name: string;
    dataFetcher?: DataFetcher<T>;
    validator?: (data: unknown[]) => T[];
    filterOptions?: any;
    viewComponent?: React.FC<DataViewerProps<T>>;
    viewOptions?: ViewOptions<T>;
}

export function createGlobalState(
    defaultState: DataViewState
): Atom<DataViewState> {
    return Atom.of(defaultState);
}

export const CoreContext = createGlobalState({});

export function getContext() {
    return CoreContext;
}
