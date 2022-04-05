import { Factory } from '@equinor/DataFactory';
import { AnalyticsOptions } from '@equinor/Diagrams';

import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { FilterOptions } from '../../../../packages/Filter/Types';
import {
    PowerBiOptions,
    PrefetchQueriesOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
} from './workspaceState';

export interface DataSource<T> {
    /** Function that returns the api call promise */
    responseAsync: (signal?: AbortSignal) => Promise<Response>;
    /** Function that parses the response to correct format, defaults to just parsing the raw response */
    responseParser?: (Response: Response) => Promise<T[]>;
}

export type Validator<T> = (data: unknown[]) => T[];
export type FactoryOptions = Omit<Factory, 'factoryId'>;
export interface IdResolverFunc<T> {
    idResolver: (id: string) => Promise<T | undefined>;
}

export interface ViewerOptions<T> {
    initialState: T[];
    objectIdentifier: keyof T;
    viewerId: string;
    defaultTab?: number;
    dataFactoryCreator(factory: Factory): void;
    openSidesheet(SidesheetContent?: React.FC<any>, props?: any): void;
    CustomSidesheet?: React.FC<T>;
    CustomSidesheetList?: React.FC<T[]>;
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

export interface WorkSpaceApi<T> {
    /** Use with caution, only cache small datasets */
    registerPrefetchQueries: (queryOptions: PrefetchQueriesOptions[]) => WorkSpaceApi<T>;
    registerDataSource: (dataSource: DataSource<T>) => WorkSpaceApi<T>;
    registerIdResolver: (idResolver: IdResolverFunc<T>) => WorkSpaceApi<T>;
    registerDataCreator: (factory: FactoryOptions) => WorkSpaceApi<T>;
    registerDataValidator: (validator: Validator<T>) => WorkSpaceApi<T>;
    registerCustomContentView: (
        viewComponent: React.FC<DataViewerProps<T>>,
        viewOptions: ViewOptions<T>
    ) => WorkSpaceApi<T>;
    registerFilterOptions: (options: FilterOptions<T>) => WorkSpaceApi<T>;
    registerTableOptions: (options: TableOptions<T>) => WorkSpaceApi<T>;
    registerTreeOptions: (options: TreeOptions<T>) => WorkSpaceApi<T>;
    registerGardenOptions: (options: GardenOptions<T>) => WorkSpaceApi<T>;
    registerAnalyticsOptions: (options: AnalyticsOptions<T>) => WorkSpaceApi<T>;
    registerStatusItems: (options: StatusFunc<T>) => WorkSpaceApi<T>;
    registerPowerBIOptions: (options: PowerBiOptions) => WorkSpaceApi<T>;
    registerWorkflowEditorOptions: (options: WorkflowEditorOptions) => WorkSpaceApi<T>;
}
