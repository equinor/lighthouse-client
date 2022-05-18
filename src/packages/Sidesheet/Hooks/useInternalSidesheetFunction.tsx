import { deref, swap } from '@dbeining/react-atom';
import { spawnConfirmationDialog } from '../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { getSidesheetContext, SidesheetCoreContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';
import { SidesheetState } from '../State/sidesheetState';

export type ToggleFunction = (prev: boolean) => boolean;
interface InternalSidesheetFunctions {
    closeSidesheet(): void;
    setWidth(width: number): void;
    setIsMinimized(isMinimized: ToggleFunction | boolean): void;
    setHasUnsavedChanges(hasUnsaved: boolean): void;
}

export function useInternalSidesheetFunction(): InternalSidesheetFunctions {
    function setHasUnsavedChanges(hasUnsaved: boolean): void {
        dispatch(getSidesheetContext(), (s: SidesheetState<any>) => ({
            ...s,
            hasUnsavedChanges: hasUnsaved,
        }));
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
        const state = deref(SidesheetCoreContext);
        if (state.hasUnsavedChanges) {
            spawnConfirmationDialog(
                'Unsaved changes, are you sure you want to abandon your changes',
                'Warning!',
                () => {
                    swap(SidesheetCoreContext, (s) => ({ ...s, hasUnsavedChanges: false }));
                    closeSidesheet();
                }
            );
            return;
        }
        //HACK: should somehow be handled from the workspace
        history.pushState('', document.title, window.location.pathname);
        dispatch(getSidesheetContext(), (currentState: SidesheetState<any>) => {
            return {
                ...currentState,
                SidesheetComponent: undefined,
                props: undefined,
                width: currentState.defaultWidth,
            };
        });
    }

    return {
        setHasUnsavedChanges,
        closeSidesheet,
        setWidth,
        setIsMinimized,
    };
}
