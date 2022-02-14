import React from 'react';

import { OptionRequestResult } from '../../../Api/ScopeChange/Access/optionsRequestChecker';
import { ServerError } from '../../../Api/ScopeChange/Types/ServerError';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export interface ScopeChangeContextState {
    request: ScopeChangeRequest;
    requestAccess: OptionRequestResult;
    setErrorMessage: (value: ServerError) => void;
}

export const ScopeChangeContext = React.createContext({} as ScopeChangeContextState);
