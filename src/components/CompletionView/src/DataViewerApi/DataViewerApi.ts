import { Factory } from '@equinor/DataFactory';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { dispatch } from './DataViewerCoreActions';
import {
    DataSource,
    DataViewerApi,
    DataViewerProps,
    FactoryOptions,
    Validator,
    ViewerOptions,
    ViewOptions,
} from './DataViewerTypes';
import {
    DataViewSideSheetOptions,
    DataViewState,
    GardenOptions,
    getContext,
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    VisualEditorOptions,
} from './DataViewState';

/**
 * The Data
 *
 * @export
 * @template T
 * @param {ViewerOptions<T>} options
 * @return {*}  {DataViewerApi<T>}
 */
export function createDataViewer<T>(options: ViewerOptions<T>): DataViewerApi<T> {
    dispatch(getContext(), (state: DataViewState) => {
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
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    dataSource,
                },
            }));
        },
        registerDataValidator(validator: Validator<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
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
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    viewComponent: viewComponent as React.FC<DataViewerProps<unknown>>,
                    viewOptions: viewOptions as ViewOptions<unknown>,
                },
            }));
        },
        registerViewOptions(viewOptions: ViewOptions<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    viewOptions: viewOptions as ViewOptions<unknown>,
                },
            }));
        },
        registerFilterOptions(filterOptions: any) {
            dispatch(getContext(), (state: DataViewState) => ({
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
        registerTableOptions<T>(tableOptions: TableOptions<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    tableOptions: tableOptions as TableOptions<unknown>,
                },
            }));
        },
        registerTreeOptions<T>(treeOptions: TreeOptions<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    treeOptions: treeOptions as TreeOptions<unknown>,
                },
            }));
        },
        registerGanttOptions(ganttOptions: any) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    ganttOptions,
                },
            }));
        },
        registerGardenOptions<T>(gardenOptions: GardenOptions<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    gardenOptions: gardenOptions as GardenOptions<unknown>,
                },
            }));
        },
        registerAnalyticsOptions<T>(analyticsOptions: AnalyticsOptions<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    analyticsOptions: analyticsOptions as AnalyticsOptions<unknown>,
                },
            }));
        },
        registerStatusItems<T>(statusFunc: StatusFunc<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    statusFunc: statusFunc as StatusFunc<unknown>,
                },
            }));
        },
        registerPowerBIOptions(powerBiOptions: PowerBiOptions) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    powerBiOptions,
                },
            }));
        },
        registerDataViewSideSheetOptions(dataViewSideSheetOptions: DataViewSideSheetOptions<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    dataViewSideSheetOptions:
                        dataViewSideSheetOptions as DataViewSideSheetOptions<unknown>,
                },
            }));
        },
        registerVisualEditorOptions(visualEditorOptions: VisualEditorOptions) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    visualEditorOptions,
                },
            }));
        },
    };
}
