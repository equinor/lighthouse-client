import { Atom } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { ScopeChangeAccess } from '../hooks/queries/useScopeChangeAccess';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';


export interface ScopeChangeAtom {
    request: ScopeChangeRequest;
    requestAccess: ScopeChangeAccess;
    actions: SidesheetApi;
}

export const scopeChangeAtom = Atom.of<ScopeChangeAtom | null>(null);
