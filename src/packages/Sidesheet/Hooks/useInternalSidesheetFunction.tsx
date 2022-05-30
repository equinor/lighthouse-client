import { spawnConfirmationDialog } from '@equinor/lighthouse-confirmation-dialog';
import { getSidesheetContext } from '../context/sidesheetContext';
import { notifyListeners } from '../Functions/notifyListeners';
import { hasUnsavedChanges } from '../Functions/openSidesheet';
import { dispatch } from '../State/actions';
import { SidesheetState } from '../State/sidesheetState';
import { SidesheetEvents } from '../Types/sidesheetEvents';

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
        if (hasUnsavedChanges()) {
            spawnConfirmationDialog(
                'Unsaved changes, are you sure you want to abandon your changes',
                'Warning!',
                () => {
                    setHasUnsavedChanges(false);
                    closeSidesheet();
                }
            );
            return;
        }
        notifyListeners(SidesheetEvents.SidesheetClosed);
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
