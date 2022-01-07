import { useAtom } from '@dbeining/react-atom';

import { getSidesheetContext } from '../context/sidesheetContext';
import { SidesheetState } from '../State/sidesheetState';

export function useSidesheet(): SidesheetState<any> {
    return useAtom(getSidesheetContext());
}
