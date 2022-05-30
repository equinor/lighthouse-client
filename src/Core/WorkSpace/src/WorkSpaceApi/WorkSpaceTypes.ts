import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterGroup, FilterOptions } from '@equinor/filter';
import { GardenOptions } from '@equinor/ParkView';
import { OpenSidesheetFunc, SidesheetApi } from '@equinor/sidesheet';
import { WorkspaceSideSheet } from './Functions/setupWorkspaceSidesheet';
import {
    PowerBiOptions,
    PrefetchQueriesOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
    WorkspaceTab
} from './workspaceState';


export interface DataSource<T> {
    /** Function that returns the api call promise */
    responseAsync: (signal?: AbortSignal) => Promise<Response>;
    /** Function that parses the response to correct format, defaults to just parsing the raw response */
    responseParser?: (Response: Response) => Promise<T[]>;
}

export type Validator<T> = (data: unknown[]) => T[];

export type IdResolverFunc<T> = (id: string) => Promise<T | undefined>;

export interface WorkspaceOptions<T, SideSheetId extends string = string> {
    initialState: T[];
    objectIdentifier: keyof T;
    viewerId: string;
    defaultTab?: WorkspaceTab;
    openSidesheet: OpenSidesheetFunc;
    CustomSidesheet?: React.FC<{ item: T; actions: SidesheetApi }>;
    customSidesheetOptions?: WorkspaceSideSheet<T, SideSheetId>;
    customGroupeSidesheet?: WorkspaceSideSheet<any, string>;
    CustomGroupeSidesheet?: React.FC<{ item: any; actions: SidesheetApi }>;
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
    registerPresets: (options: PresetOption[]) => WorkSpaceApi<T>;
    registerSearchOptions: (options: SearchOption<T>[]) => WorkSpaceApi<T>;
}

export type PresetOption = GardenPresetOption | TablePresetOption;
interface GardenPresetOption {
    name: string;
    type: Extract<WorkspaceTab, 'garden'>;
    filter: FilterPreset;
    garden: GardenPreset;
}

interface TablePresetOption {
    name: string;
    type: Extract<WorkspaceTab, 'table'>;
    filter: FilterPreset;
    table: TablePreset;
}

interface TablePreset {}
interface GardenPreset {
    gardenKey: string;
    groupByKeys?: string[];
    customGroupByKeys?: Record<string, unknown>;
}

interface FilterPreset {
    filterGroups: FilterGroup[];
}

export interface SearchOption<T> {
    name: string;
    /** Takes in an item and returns the search value */
    valueFormatter: (item: T) => string;
}
