import { Factory } from '@equinor/DataFactory';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { dispatch } from './CoreActions';
import {
    getWorkSpaceContext,
    PowerBiOptions,
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
        options.openSidesheet(options.CustomSidesheet, item);
    };

    //const onMultiSelect = (items: T[]) => options.openSidesheet(options.CustomSidesheetList, items);

    function updateState(
        propertyName: keyof WorkSpaceConfig<T>,
        update: WorkSpaceConfig<T>[typeof propertyName]
    ) {
        dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => {
            const newState = state;
            if (update) {
                newState[options.viewerId][propertyName] = update as any;
            }
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
                initialState: options.initialState,
            },
        };
    });

    const workspaceAPI = {
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
            updateState('dataSource', dataSource);

            return workspaceAPI;
        },
        registerIdResolver(idResolver: IdResolverFunc<T>) {
            updateState('idResolver', idResolver.idResolver);

            return workspaceAPI;
        },
        registerDataValidator(validator: Validator<T>) {
            updateState('validator', validator);

            return workspaceAPI;
        },
        registerCustomContentView(
            viewComponent: React.FC<DataViewerProps<T>>,
            viewOptions: ViewOptions<T>
        ) {
            updateState('viewComponent', viewComponent);
            updateState('viewOptions', viewOptions);

            return workspaceAPI;
        },
        registerFilterOptions(filterOptions: any) {
            updateState('filterOptions', filterOptions);

            return workspaceAPI;
        },

        /**
         * View option Registration
         *
         */
        registerTableOptions<T>(tableOptions: Omit<TableOptions<T>, 'onSelect'>) {
            updateState('tableOptions', { ...tableOptions, onSelect });

            return workspaceAPI;
        },
        registerTreeOptions<T>(treeOptions: Omit<TreeOptions<T>, 'onSelect'>) {
            updateState('treeOptions', { ...treeOptions, onSelect });

            return workspaceAPI;
        },

        registerGardenOptions<T>(gardenOptions: Omit<GardenOptions<T>, 'onSelect'>) {
            updateState('gardenOptions', { ...gardenOptions, onSelect });

            return workspaceAPI;
        },
        registerAnalyticsOptions<T>(analyticsOptions: AnalyticsOptions<T>) {
            updateState('analyticsOptions', analyticsOptions);

            return workspaceAPI;
        },
        registerStatusItems<T>(statusFunc: StatusFunc<T>) {
            updateState('statusFunc', statusFunc);

            return workspaceAPI;
        },
        registerPowerBIOptions(powerBiOptions: PowerBiOptions) {
            updateState('powerBiOptions', powerBiOptions);

            return workspaceAPI;
        },
        registerWorkflowEditorOptions(workflowEditorOptions: WorkflowEditorOptions) {
            updateState('workflowEditorOptions', workflowEditorOptions);

            return workspaceAPI;
        },
    };

    return workspaceAPI;
}
