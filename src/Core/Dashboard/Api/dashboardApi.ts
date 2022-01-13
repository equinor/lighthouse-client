import { KpiBuilder } from '@equinor/Kpi';
import { DashboardState, DataSource, FilterOptions, PageConfig, Validator } from '../Types/State';
import { dispatch, getDashboardContext } from './dashboardState';

export interface DashboardOptions {
    title: string;
    dashboardId: string;
    description?: string;
}

export interface DashboardApiInstance<T> {
    registerPage(config: PageConfig<T>): void;
    registerKpi(kpiBuilder: KpiBuilder<T>): void;
    registerDataSource(dataFetcher: DataSource<T>): void;
    registerDataValidator(validator: Validator<T>): void;
    registerFilterOptions(options: FilterOptions<T>): void;
}

export function createDashboard<T>({
    dashboardId,
    title,
    description,
}: DashboardOptions): DashboardApiInstance<T> {
    dispatch(getDashboardContext(), (state: DashboardState) => {
        if (state[dashboardId]) {
            // eslint-disable-next-line no-console
            console.warn(`${dashboardId} is already registered dashboard.`);
        }
        return {
            ...state,
            [dashboardId]: {
                dashboardId,
                title,
                description,
                pages: {},
            },
        };
    });

    return {
        registerPage(config: PageConfig<T>): void {
            dispatch(getDashboardContext(), (state: DashboardState) => {
                const pages = state[dashboardId].pages;
                pages[config.pageId] = {
                    ...config,
                } as PageConfig<unknown>;

                return {
                    ...state,
                    [dashboardId]: {
                        ...state[dashboardId],
                        pages: {
                            ...pages,
                        },
                    },
                };
            });
        },
        registerDataSource(dataSource: DataSource<T>): void {
            dispatch(getDashboardContext(), (state: DashboardState) => {
                return {
                    ...state,
                    [dashboardId]: {
                        ...state[dashboardId],
                        dataSource,
                    },
                };
            });
        },
        registerDataValidator(validator: Validator<T>): void {
            dispatch(getDashboardContext(), (state: DashboardState) => {
                return {
                    ...state,
                    [dashboardId]: {
                        ...state[dashboardId],
                        validator,
                    },
                };
            });
        },
        registerFilterOptions(filterOptions: FilterOptions<T>): void {
            dispatch(getDashboardContext(), (state: DashboardState) => {
                return {
                    ...state,
                    [dashboardId]: {
                        ...state[dashboardId],
                        filterOptions: filterOptions as FilterOptions<unknown>,
                    },
                };
            });
        },
        registerKpi(kpiBuilder: KpiBuilder<T>): void {
            dispatch(getDashboardContext(), (state: DashboardState) => {
                return {
                    ...state,
                    [dashboardId]: {
                        ...state[dashboardId],
                        kpiBuilder: kpiBuilder as KpiBuilder<unknown>,
                    },
                };
            });
        },
    };
}
