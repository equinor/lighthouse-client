import { Factory } from '@equinor/DataFactory';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { dispatch } from './CoreActions';
import {
    getWorkSpaceContext,
    PowerBiOptions,
    PrefetchQueriesOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
    WorkSpaceConfig,
    WorkSpaceState,
} from './workspaceState';
import {
    DataSource,
    DataViewerProps,
    FactoryOptions,
    IdResolverFunc,
    SearchOption,
    Validator,
    ViewerOptions,
    ViewOptions,
    WorkSpaceApi,
} from './WorkSpaceTypes';

/**
 * The Data
 *
 * @export
 * @template T
 * @param {ViewerOptions<T>} options
 * @return {*}  {DataViewerApi<T>}
 */
export function createWorkSpace<T>(options: ViewerOptions<T>): WorkSpaceApi<T> {
    const onSelect = (item: T) => {
        const url = new URL(window.location.href);
        url.hash = `${options.viewerId}/${item[options.objectIdentifier]}`;
        window.history.pushState({}, '', url);

        options.openSidesheet(options.CustomSidesheet, item, options.viewerId);
    };

    //const onMultiSelect = (items: T[]) => options.openSidesheet(options.CustomSidesheetList, items);

    function updateState(update: Partial<WorkSpaceConfig<unknown>>) {
        dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => {
            const newState = state;
            newState[options.viewerId] = { ...update, ...newState[options.viewerId] };
            return newState;
        });
    }

    dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => {
        if (state[options.viewerId]) {
            // eslint-disable-next-line no-console
            console.warn(`${options.viewerId} is already a registered Workspace.`);
        }
        return {
            ...state,
            [options.viewerId]: {
                onSelect: onSelect as (item: unknown) => void,
                objectIdentifier: options.objectIdentifier as string,
                name: options.viewerId,
                defaultTab: options.defaultTab ?? 'table',
                initialState: options.initialState,
            },
        };
    });

    const workspaceAPI: WorkSpaceApi<T> = {
        registerPrefetchQueries(queryOptions: PrefetchQueriesOptions[]) {
            updateState({ prefetchQueriesOptions: queryOptions ?? [] });

            return workspaceAPI;
        },
        registerDataCreator(factoryOptions: FactoryOptions) {
            if (!options.dataFactoryCreator) {
                // eslint-disable-next-line no-console
                console.warn(
                    'No data dataFactoryCreator is registered. Add when creating the data viewer.'
                );
                return workspaceAPI;
            }
            const factory: Factory = { ...factoryOptions, factoryId: options.viewerId };
            options.dataFactoryCreator(factory);
            return workspaceAPI;
        },
        registerDataSource(dataSource: DataSource<T>) {
            updateState({ dataSource });

            return workspaceAPI;
        },
        registerIdResolver(idResolver: IdResolverFunc<T>) {
            updateState({ idResolver: idResolver.idResolver });

            return workspaceAPI;
        },
        registerDataValidator(validator: Validator<T>) {
            updateState({ validator });

            return workspaceAPI;
        },
        registerCustomContentView(
            viewComponent: React.FC<DataViewerProps<T>>,
            viewOptions: ViewOptions<T>
        ) {
            updateState({
                viewComponent: viewComponent as React.FC<DataViewerProps<unknown>>,
                viewOptions: viewOptions as ViewOptions<unknown>,
            });

            return workspaceAPI;
        },
        registerFilterOptions(filterOptions: any) {
            updateState({ filterOptions });

            return workspaceAPI;
        },

        registerPresets(options) {
            updateState({ presetOptions: options });
            return workspaceAPI;
        },

        /**
         * View option Registration
         *
         */
        registerTableOptions<T>(tableOptions: Omit<TableOptions<T>, 'onSelect'>) {
            updateState({
                tableOptions: { onSelect, ...tableOptions } as TableOptions<unknown>,
            });

            return workspaceAPI;
        },
        registerTreeOptions<T>(treeOptions: Omit<TreeOptions<T>, 'onSelect'>) {
            updateState({ treeOptions: { ...treeOptions, onSelect } as TreeOptions<unknown> });

            return workspaceAPI;
        },

        registerGardenOptions<T>(gardenOptions: Omit<GardenOptions<T>, 'onSelect'>) {
            updateState({
                gardenOptions: {
                    //HACK if customGroupByKeys is undefined, it will break memoized variable in VGarden and cause rerender??
                    customGroupByKeys: {},
                    ...gardenOptions,
                    onSelect,
                } as GardenOptions<unknown>,
            });

            return workspaceAPI;
        },
        registerSearchOptions(searchOptions) {
            updateState({
                searchOptions: searchOptions as SearchOption<unknown>[],
            });
            return workspaceAPI;
        },
        registerAnalyticsOptions<T>(analyticsOptions: AnalyticsOptions<T>) {
            updateState({ analyticsOptions: analyticsOptions as AnalyticsOptions<unknown> });

            return workspaceAPI;
        },
        registerStatusItems<T>(statusFunc: StatusFunc<T>) {
            updateState({ statusFunc: statusFunc as StatusFunc<unknown> });

            return workspaceAPI;
        },
        registerPowerBIOptions(powerBiOptions: PowerBiOptions) {
            updateState({ powerBiOptions });

            return workspaceAPI;
        },
        registerWorkflowEditorOptions(workflowEditorOptions: WorkflowEditorOptions) {
            updateState({ workflowEditorOptions });

            return workspaceAPI;
        },
    };

    return workspaceAPI;
}
