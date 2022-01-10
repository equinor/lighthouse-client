import { dispatch } from '../State/actions';
import { getSidesheetContext } from '../context/sidesheetContext';
import { useAtom } from '@dbeining/react-atom';
import { useEffect } from 'react';

interface usePopoutSidesheetReturn {
    closeSidesheet: () => void;
}

export const useSidesheetCleanup = (): usePopoutSidesheetReturn => {
    const { isPinned } = useAtom(getSidesheetContext());

    function closeSidesheet(): void {
        //TODO: isPinned is always undefined at this point?
        if (!isPinned) {
            dispatch(getSidesheetContext(), () => {
                return {
                    SidesheetComponent: undefined,
                    props: undefined,
                    isPinned: undefined,
                };
            });
        }
    }

    return {
        closeSidesheet,
    };
};
