import { dispatch } from './DataViewerCoreActions';
import {
    DataFetcher,
    DataViewerApi,
    DataViewerProps,
    Validator,
    ViewerOptions,
    ViewOptions
} from './DataViewerTypes';
import { DataViewState, getContext } from './DataViewState';

/**
 * The Data
 *
 * @export
 * @template T
 * @param {ViewerOptions<T>} options
 * @return {*}  {DataViewerApi<T>}
 */
export function createDataViewer<T>(
    options: ViewerOptions<T>
): DataViewerApi<T> {
    dispatch(getContext(), (state: DataViewState) => {
        if (state[options.viewerId]) {
            console.warn(`${options.viewerId} is already registered DataView.`);
        }
        return {
            ...state,
            [options.viewerId]: {
                name: options.viewerId,
                initialState: options.initialState
            }
        };
    });

    return {
        registerDataFetcher(dataFetcher: DataFetcher<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    dataFetcher
                }
            }));
        },
        registerDataValidator(validator: Validator<T>) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    validator
                }
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
                    viewComponent: viewComponent as React.FC<
                        DataViewerProps<unknown>
                    >,
                    viewOptions: viewOptions as ViewOptions<unknown>
                }
            }));
        },
        registerFilterOptions(filterOptions: any) {
            dispatch(getContext(), (state: DataViewState) => ({
                ...state,
                [options.viewerId]: {
                    ...state[options.viewerId],
                    filterOptions
                }
            }));
        },

        /**
         * View option Registration
         *
         */
        registerTableOptions(
            {
                /** Some table options here*/
            }
        ) {},
        registerTreeOptions(
            {
                /** Some tree options here*/
            }
        ) {},
        registerGanttOptions(
            {
                /** Some gantt options here*/
            }
        ) {},
        registerGardenOptions(
            {
                /** Some garden options here*/
            }
        ) {},
        registerAnalyticsOptions(
            {
                /** Some garden options here*/
            }
        ) {}
    };
}
