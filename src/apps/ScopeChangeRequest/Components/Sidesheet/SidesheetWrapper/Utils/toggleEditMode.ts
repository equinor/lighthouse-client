import { swap } from '@dbeining/react-atom';
import { sideSheetEditModeAtom } from '../../../../Atoms/editModeAtom';

export function toggleEditMode(): void {
    swap(sideSheetEditModeAtom, (s) => !s);
}
