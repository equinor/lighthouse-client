import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterGroup, FilterOptions } from '@equinor/filter';
import { GardenOptions } from '@equinor/ParkView';
import { OpenSidesheetFunc } from '@equinor/sidesheet';
import { WorkspaceSideSheet } from './Functions/setupWorkspaceSidesheet';
import {
    PowerBiOptions,
    PrefetchQueriesOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
    WorkspaceTab,
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
    customSidesheetOptions?: WorkspaceSideSheet<T, SideSheetId>;
    customGroupeSidesheet?: WorkspaceSideSheet<any, string>;
}

export type DataViewerProps<T extends Record<PropertyKey, unknown>> = ViewOptions<T> & {
    data: T;
};

export type ViewOptions<T extends Record<PropertyKey, unknown>> = {
    objectIdentifierKey: keyof T;
    title?: {
        key: keyof T;
        label: string;
    };
    description?: {
        key: keyof T;
        label: string;
    };
};

export type WorkSpaceApi<T extends Record<PropertyKey, unknown>> = {
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
    registerHelpPage: (options: HelpPageOptions) => WorkSpaceApi<T>;
};

export type PresetOption = GardenPresetOption | TablePresetOption;
type GardenPresetOption = {
    name: string;
    type: Extract<WorkspaceTab, 'garden'>;
    filter: FilterPreset;
    garden: GardenPreset;
};

type TablePresetOption = {
    name: string;
    type: Extract<WorkspaceTab, 'table'>;
    filter: FilterPreset;
    table: TablePreset;
};

interface TablePreset {}

type GardenPreset = {
    gardenKey: string;
    groupByKeys?: string[];
    customGroupByKeys?: Record<string, unknown>;
};

type FilterPreset = {
    filterGroups: FilterGroup[];
};

export type SearchOption<T> = {
    name: string;
    /** Takes in an item and returns the search value */
    valueFormatter: (item: T) => string;
};

export type HelpPageOptions = {
    Component: () => JSX.Element;
};
