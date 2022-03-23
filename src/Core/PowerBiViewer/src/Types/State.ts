import { Filter } from '@equinor/lighthouse-powerbi';

export interface CoreViewState {
    [key: string]: ViewState;
}

export interface ViewState {
    title: string;
    shortName: string;
    reports: FusionPowerBiOptions[];
}

export interface FusionPowerBiOptions {
    reportURI: string;
    filter?: Filter[];
    options?: { showFilter?: boolean; enablePageNavigation?: boolean };
    pages: Page[];
}

export interface Page {
    pageId: string;
    pageTitle: string;
}
