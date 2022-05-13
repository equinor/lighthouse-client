import { FusionPowerBiOptions } from '../Types/State';

export const isDifferentReport = (
    activeReport: FusionPowerBiOptions | undefined,
    newReport: FusionPowerBiOptions | undefined
) => newReport && activeReport?.reportURI !== newReport?.reportURI;
