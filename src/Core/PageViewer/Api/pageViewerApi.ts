import { createDashboard, DashboardApiInstance } from '../../Dashboard/Api/dashboardApi';
import { CoreViewState, CustomPage, DashboardOptions, FusionPowerBiOptions } from '../Types/State';
import { dispatch, getContext } from './pageViewerState';

export type PageViewerOptions = {
    title: string;
    viewerId: string;
    openSidesheet(SidesheetContent?: React.FC<any>, props?: any): void;
};

export type PageViewerInstance = {
    registerFusionPowerBi(reportId: string, options: FusionPowerBi): void;
    registerDashboard<T extends Record<PropertyKey, unknown>>(
        pageId: string,
        options: DashboardConfig
    ): DashboardApiInstance<T>;
    registerCustom(pageId: string, options: CustomConfig): void;
};

type FusionPowerBi = Omit<FusionPowerBiOptions, 'type'>;
type DashboardConfig = Omit<DashboardOptions, 'type' | 'dashboardId'>;
type CustomConfig = Omit<CustomPage, 'type'>;

export function createPageViewer({
    viewerId,
    title,
    openSidesheet,
}: PageViewerOptions): PageViewerInstance {
    dispatch(getContext(), (state: CoreViewState) => {
        if (state[viewerId]) {
            // eslint-disable-next-line no-console
            console.warn(`${viewerId} is already registered PageViewer.`);
        }
        return {
            ...state,
            [viewerId]: {
                title,
                shortName: viewerId,
                pages: {},
                onSelect: openSidesheet,
            },
        };
    });

    return {
        registerFusionPowerBi(pageId: string, options: FusionPowerBi) {
            dispatch(getContext(), (state: CoreViewState) => {
                const pages = state[viewerId].pages;
                pages[pageId] = {
                    type: 'FusionPowerBi',
                    ...options,
                };

                return {
                    ...state,
                    [viewerId]: {
                        ...state[viewerId],
                        pages: {
                            ...pages,
                        },
                    },
                };
            });
        },
        registerDashboard<T extends Record<PropertyKey, unknown>>(
            pageId: string,
            options: DashboardConfig
        ) {
            dispatch(getContext(), (state: CoreViewState) => {
                const pages = state[viewerId].pages;
                pages[pageId] = {
                    type: 'Dashboard',
                    dashboardId: pageId,
                    ...options,
                };

                return {
                    ...state,
                    [viewerId]: {
                        ...state[viewerId],
                        pages: {
                            ...pages,
                        },
                    },
                };
            });

            return createDashboard<T>({
                dashboardId: pageId,
                title: options.title,
                description: options.description,
            });
        },
        registerCustom(pageId: string, options: CustomConfig) {
            dispatch(getContext(), (state: CoreViewState) => {
                const pages = state[viewerId].pages;
                pages[pageId] = {
                    type: 'Custom',
                    ...options,
                };

                return {
                    ...state,
                    [viewerId]: {
                        ...state[viewerId],
                        pages: {
                            ...pages,
                        },
                    },
                };
            });
        },
    };
}
