import { useContext } from 'react';
import {
    ScopeChangeAccessContext,
    ScopeChangeAccessContextState,
} from './scopeChangeAccessContext';

export function useScopeChangeAccessContext(): ScopeChangeAccessContextState {
    return useContext(ScopeChangeAccessContext);
}
