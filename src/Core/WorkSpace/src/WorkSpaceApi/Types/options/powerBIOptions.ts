import { Filter, PBIOptions } from '@equinor/lighthouse-powerbi';

export type PowerBiOptions = {
    reportURI: string;
    filter?: Filter[];
    options?: PBIOptions;
};
