import { Filter, PBIOptions } from '@equinor/lighthouse-powerbi';

export interface CoreViewState {
  [key: string]: ViewState;
}

export interface ViewState {
  title: string;
  shortName: string;
  groupe: string;
  report: FusionPowerBiOptions;
}

export interface FusionPowerBiOptions {
  reportURI: string;
  filter?: Filter[];
  options?: PBIOptions;
}

export interface Page {
  pageId: string;
  pageTitle: string;
  default?: boolean;
}
