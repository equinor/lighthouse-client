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
    WorkSpaceState,
} from './State';
import {
    DataSource,
    DataViewerProps,
    FactoryOptions,
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
    const onSelect = (item: T) => options.openSidesheet(options.CustomSidesheet, item);
    //const onMultiSelect = (items: T[]) => options.openSidesheet(options.CustomSidesheetList, items);

    dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => {
        if (state[options.viewerId]) {
            // eslint-disable-next-line no-console
            console.warn(`${options.viewerId} is already registered DataView.`);
        }
        return {
            ...state,
            [options.viewerId]: {
                name: options.viewerId,
                initialState: options.initialState,
            },
        };
    });

    return {
        registerDataCreator(factoryOptions: FactoryOptions) {
            if (!options.dataFactoryCreator) {
                // eslint-disable-next-line no-console
                console.warn(
                    'No data dataFactoryCreator is registered. Add when creating the data viewer.'
                );
                return;
            }
            const factory: Factory = { ...factoryOptions, factoryId: options.viewerId };
            options.dataFactoryCreator(factory);
        },
        registerDataSource(dataSource: DataSource<T>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    dataSource,
                },
            }));
        },
        registerDataValidator(validator: Validator<T>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    validator,
                },
            }));
        },
        registerCustomContentView(
            viewComponent: React.FC<DataViewerProps<T>>,
            viewOptions: ViewOptions<T>
        ) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    viewComponent: viewComponent as React.FC<DataViewerProps<unknown>>,
                    viewOptions: viewOptions as ViewOptions<unknown>,
                },
            }));
        },
        registerFilterOptions(filterOptions: any) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    filterOptions,
                },
            }));
        },

        /**
         * View option Registration
         *
         */
        registerTableOptions<T>(tableOptions: Omit<TableOptions<T>, 'onSelect'>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    tableOptions: { ...tableOptions, onSelect } as TableOptions<unknown>,
                },
            }));
        },
        registerTreeOptions<T>(treeOptions: Omit<TreeOptions<T>, 'onSelect'>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    treeOptions: { ...treeOptions, onSelect } as TreeOptions<unknown>,
                },
            }));
        },
        registerGanttOptions(ganttOptions: any) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    ganttOptions,
                },
            }));
        },
        registerGardenOptions<T>(gardenOptions: Omit<GardenOptions<T>, 'onSelect'>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    gardenOptions: {
                        ...gardenOptions,
                        onSelect,
                    } as GardenOptions<unknown>,
                },
            }));
        },
        registerAnalyticsOptions<T>(analyticsOptions: AnalyticsOptions<T>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    analyticsOptions: analyticsOptions as AnalyticsOptions<unknown>,
                },
            }));
        },
        registerStatusItems<T>(statusFunc: StatusFunc<T>) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    statusFunc: statusFunc as StatusFunc<unknown>,
                },
            }));
        },
        registerPowerBIOptions(powerBiOptions: PowerBiOptions) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    powerBiOptions,
                },
            }));
        },
        registerWorkflowEditorOptions(workflowEditorOptions: WorkflowEditorOptions) {
            dispatch(getWorkSpaceContext(), (state: WorkSpaceState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    workflowEditorOptions,
                },
            }));
        },
    };
}
