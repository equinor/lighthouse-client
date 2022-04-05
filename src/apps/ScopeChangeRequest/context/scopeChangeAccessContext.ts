import React from 'react';

import { OptionRequestResult } from '../api/ScopeChange/Access/optionsRequestChecker';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

export interface ScopeChangeContextState {
    request: ScopeChangeRequest;
    requestAccess: OptionRequestResult;
}

export const ScopeChangeContext = React.createContext({} as ScopeChangeContextState);
