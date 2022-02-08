import React from 'react';

import { OptionRequestResult } from '../../../Api/ScopeChange/Access/optionsRequestChecker';
import { StrippedCriteria } from '../../../Types/scopeChangeRequest';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export interface ScopeChangeAccessContextState {
    request: ScopeChangeRequest;
    requestAccess: OptionRequestResult;
    signableCriterias: StrippedCriteria[] | undefined;
    contributionId: string | undefined;
    canAddContributor: boolean;
    notifyChange: () => Promise<void>;
}

export const ScopeChangeAccessContext = React.createContext({} as ScopeChangeAccessContextState);
