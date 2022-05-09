import { Atom, swap } from '@dbeining/react-atom';

export const sideSheetEditModeAtom = Atom.of(false);

export function disableEditMode(): void {
    swap(sideSheetEditModeAtom, () => false);
}
export function enableEditMode(): void {
    swap(sideSheetEditModeAtom, () => true);
}

export function toggleEditMode(): void {
    swap(sideSheetEditModeAtom, (s) => !s);
}
