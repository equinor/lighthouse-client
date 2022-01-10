import { useAtom } from '@dbeining/react-atom';

import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';

interface InternalSidesheetFunctions {
    closeSidesheet: () => void;
    togglePinned: () => void;
}

export function useInternalSidesheetFunction(): InternalSidesheetFunctions {
    const currentState = useAtom(getSidesheetContext());

    function togglePinned(): void {
        dispatch(getSidesheetContext(), () => {
            return {
                ...currentState,
                isPinned: currentState.isPinned ? undefined : true,
            };
        });
    }

    function closeSidesheet(): void {
        dispatch(getSidesheetContext(), () => {
            return {
                SidesheetComponent: undefined,
                props: undefined,
                isPinned: undefined,
            };
        });
    }

    return {
        togglePinned,
        closeSidesheet,
    };
}
