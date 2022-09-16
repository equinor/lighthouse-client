import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import { GardenOptions } from '@equinor/ParkView';
import {
    DataSource,
    DataViewerProps,
    HelpPageOptions,
    PowerBiOptions,
    PrefetchQueriesOptions,
    PresetOption,
    SearchOption,
    StatusFunc,
    TableOptions,
    TreeOptions,
    Validator,
    ViewOptions,
    WorkflowEditorOptions,
} from './Types/options';

export type IdResolverFunc<T> = (id: string) => Promise<T | undefined>;

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
