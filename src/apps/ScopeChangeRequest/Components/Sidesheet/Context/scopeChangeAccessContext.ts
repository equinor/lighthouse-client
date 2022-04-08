import React from 'react';

import { OptionRequestResult } from '../../../Api/ScopeChange/Access/optionsRequestChecker';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export interface ScopeChangeContextState {
    request: ScopeChangeRequest;
    requestAccess: OptionRequestResult;
}

export const ScopeChangeContext = React.createContext({} as ScopeChangeContextState);
