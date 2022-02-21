import { useContext } from 'react';
import { ScopeChangeContext, ScopeChangeContextState } from './scopeChangeAccessContext';

export function useScopeChangeContext(): ScopeChangeContextState {
    return useContext(ScopeChangeContext);
}
