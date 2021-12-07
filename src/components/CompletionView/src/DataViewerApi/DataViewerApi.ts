import { dispatch } from './DataViewerCoreActions';
import {
    DataFetcher,
    DataViewerApi,
    DataViewerProps,
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
    TableOptions,
    TreeOptions,
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
        registerDataFetcher(dataFetcher: DataFetcher<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    dataFetcher,
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
        registerTableOptions(tableOptions: TableOptions) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    tableOptions,
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
        registerAnalyticsOptions(analyticsOptions: any) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    analyticsOptions,
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
    };
}
