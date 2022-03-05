import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';
import { SidesheetState } from '../State/sidesheetState';

type ToggleFunction = (prev: boolean) => boolean;
interface InternalSidesheetFunctions {
    closeSidesheet(): void;
    togglePinned(): void;
    setWidth(width: number): void;
    setIsMinimized(isMinimized: ToggleFunction | boolean): void;
}

export function useInternalSidesheetFunction(): InternalSidesheetFunctions {
    function togglePinned(): void {
        dispatch(getSidesheetContext(), (currentState: SidesheetState<any>) => {
            return {
                ...currentState,
                isPinned: currentState.isPinned ? undefined : true,
            };
        });
    }
    function setWidth(width: number): void {
        dispatch(getSidesheetContext(), (currentState: SidesheetState<any>) => {
            return {
                ...currentState,
                width,
            };
        });
    }
    function setIsMinimized(isMinimized: (prev: boolean) => boolean | boolean): void {
        dispatch(getSidesheetContext(), (currentState: SidesheetState<any>) => {
            return {
                ...currentState,
                isMinimized:
                    typeof isMinimized === 'function'
                        ? isMinimized(currentState.isMinimized)
                        : isMinimized,
            };
        });
    }

    function closeSidesheet(): void {
        //HACK: should somehow be handled from the workspace
        history.pushState('', document.title, window.location.pathname);
        dispatch(getSidesheetContext(), (currentState: SidesheetState<any>) => {
            return {
                ...currentState,
                SidesheetComponent: undefined,
                props: undefined,
                isPinned: undefined,
                width: currentState.defaultWidth,
            };
        });
    }

    return {
        togglePinned,
        closeSidesheet,
        setWidth,
        setIsMinimized,
    };
}
