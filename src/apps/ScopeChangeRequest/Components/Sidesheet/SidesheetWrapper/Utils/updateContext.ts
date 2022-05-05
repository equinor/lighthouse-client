import { swap } from '@dbeining/react-atom';

import { SidesheetApi } from '../../../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { scopeChangeAtom } from '../../../../Atoms/scopeChangeAtom';
import { ScopeChangeRequest } from '../../../../types/scopeChangeRequest';

export function updateContext(item: ScopeChangeRequest, api: SidesheetApi): void {
    swap(scopeChangeAtom, (old) => ({
        ...old,
        request: item,
        actions: api,
    }));
}
