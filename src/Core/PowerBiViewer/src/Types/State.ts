import { Filter, PBIOptions } from '@equinor/lighthouse-powerbi';

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
    options?: PBIOptions;
    pages: Page[];
    loadPagesInDev?: boolean;
}

export interface Page {
    pageId: string;
    pageTitle: string;
    default?: boolean;
}
