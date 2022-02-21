import React from 'react';

import { OptionRequestResult } from '../../../Api/ScopeChange/Access/optionsRequestChecker';
import { ServerError } from '../../../Types/ScopeChange/ServerError';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export interface ScopeChangeContextState {
    request: ScopeChangeRequest;
    requestAccess: OptionRequestResult;
    setErrorMessage: (value: ServerError) => void;
    isRefetching: boolean;
}

export const ScopeChangeContext = React.createContext({} as ScopeChangeContextState);
