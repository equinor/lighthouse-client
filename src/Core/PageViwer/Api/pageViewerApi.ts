import { CoreViewState, CustomPage, FusionPowerBiConfig } from '../Types/State';
import { dispatch, getContext } from './pageViewerState';

export interface PageViewerOptions {
    title: string;
    viewerId: string;
}

type FusionPowerBi = Omit<FusionPowerBiConfig, 'type'>;
type CustomConfig = Omit<CustomPage, 'type'>;

export function createPageViewer({ viewerId, title }: PageViewerOptions): {
    registerFusionPowerBi(reportId: string, options: FusionPowerBi): void;
    registerCustom(pageId: string, options: CustomConfig): void;
} {
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
                } as FusionPowerBiConfig;

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
