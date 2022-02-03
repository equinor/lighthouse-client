import React from 'react';

import { OptionRequestResult } from '../../../Api/ScopeChange/Access/optionsRequestChecker';
import { StrippedCriteria } from '../../../Types/scopeChangeRequest';
import { ScopeChangeRequest } from '../../../Types/scopeChangeRequest';

export interface ScopeChangeAccessContextState {
    request: ScopeChangeRequest;
    performingAction: boolean;
    setPerformingAction: (value: boolean) => void;
    requestAccess: OptionRequestResult;
    signableCriterias: StrippedCriteria[] | undefined;
    contributionId: string | undefined;
    canAddContributor: boolean;
    refetch: () => Promise<void>;
}

export const ScopeChangeAccessContext = React.createContext({} as ScopeChangeAccessContextState);
