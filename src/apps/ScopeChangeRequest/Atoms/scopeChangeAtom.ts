import { Atom } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { ScopeChangeAccess } from '../types/query/scopeChangeAccess';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

export interface ScopeChangeAtom {
    request: ScopeChangeRequest;
    requestAccess: ScopeChangeAccess;
    actions: SidesheetApi;
}

export const scopeChangeAtom = Atom.of<ScopeChangeAtom>({
    requestAccess: {
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
        canUnVoid: false,
        canVoid: false,
    },
    actions: {} as SidesheetApi,
    request: {} as ScopeChangeRequest,
});
