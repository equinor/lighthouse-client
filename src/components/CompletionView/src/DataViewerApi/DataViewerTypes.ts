import { AnalyticsOptions } from '@equinor/Diagrams';
import {
    FilterOptions,
    GardenOptions,
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
} from './DataViewState';

export type DataFetcher<T> = () => Promise<T[]>;
export type Validator<T> = (data: unknown[]) => T[];

export interface ViewerOptions<T> {
    initialState: T[];
    primaryViewKey: keyof T;
    viewerId: string;
}

export interface DataViewerProps<T> extends ViewOptions<T> {
    data: T;
}

export interface ViewOptions<T> {
    objectIdentifierKey: keyof T;
    title?: {
        key: keyof T;
        label: string;
    };
    description?: {
        key: keyof T;
        label: string;
    };
}

export interface DataViewerApi<T> {
    registerDataFetcher: (dataFetcher: DataFetcher<T>) => void;
    registerDataValidator: (validator: Validator<T>) => void;
    registerCustomContentView: (
        viewComponent: React.FC<DataViewerProps<T>>,
        viewOptions: ViewOptions<T>
    ) => void;
    registerViewOptions: (viewOptions: ViewOptions<T>) => void;
    registerFilterOptions: (options: FilterOptions<T>) => void;
    registerTableOptions: (options: TableOptions) => void;
    registerTreeOptions: (options: TreeOptions<T>) => void;
    registerGanttOptions: (options: any) => void;
    registerGardenOptions: (options: GardenOptions<T>) => void;
    registerAnalyticsOptions: (options: AnalyticsOptions<T>) => void;
    registerStatusItems: (options: StatusFunc<T>) => void;
    registerPowerBIOptions: (options: PowerBiOptions) => void;
}
