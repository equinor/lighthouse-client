import { Atom } from '@dbeining/react-atom';
import { createGlobalDialogState } from '../State/actions';
import { DialogState } from '../State/dialogState';

export const dialogCoreContext = createGlobalDialogState({
    dialogText: '',
    dialogTitle: '',
    dialogChildren: undefined,
    onConfirm: undefined,
});

export function getDialogContext(): Atom<DialogState> {
    return dialogCoreContext;
}
