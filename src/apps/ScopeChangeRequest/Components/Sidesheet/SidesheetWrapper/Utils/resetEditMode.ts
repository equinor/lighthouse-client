import { swap } from '@dbeining/react-atom';
import { sideSheetEditModeAtom } from '../../../../Atoms/editModeAtom';

export function resetEditMode(): void {
    swap(sideSheetEditModeAtom, () => false);
}
