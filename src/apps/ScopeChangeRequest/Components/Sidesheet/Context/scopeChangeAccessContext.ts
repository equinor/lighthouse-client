import React from 'react';
import { QueryClient } from 'react-query';

import { OptionRequestResult } from '../../../Api/ScopeChange/Access/optionsRequestChecker';
import { ServerError } from '../../../Api/ScopeChange/Types/ServerError';
import { StrippedCriteria } from '../../../Types/scopeChangeRequest';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export interface ScopeChangeContextState {
    request: ScopeChangeRequest;
    requestAccess: OptionRequestResult;
    setErrorMessage: (value: ServerError) => void;
    queryClient: QueryClient;
}

export const ScopeChangeContext = React.createContext({} as ScopeChangeContextState);
