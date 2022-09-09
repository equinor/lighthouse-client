import { OptionRequestResult } from './optionsRequest';

export interface ScopeChangeAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}
