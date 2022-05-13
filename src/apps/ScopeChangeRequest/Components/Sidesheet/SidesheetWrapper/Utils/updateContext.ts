import { swap } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';

import { scopeChangeAtom } from '../../../../Atoms/scopeChangeAtom';
import { ScopeChangeRequest } from '../../../../types/scopeChangeRequest';

export function updateContext(item?: ScopeChangeRequest, api?: SidesheetApi): void {
    swap(scopeChangeAtom, (old) => ({
        ...old,
        request: item ?? old.request,
        actions: api ?? old.actions,
    }));
}
