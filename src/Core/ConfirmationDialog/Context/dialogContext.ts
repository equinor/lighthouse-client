import { Atom } from '@dbeining/react-atom';
import { createGlobalDialogState } from '../State/actions';
import { DialogState } from '../State/dialogState';

export const dialogCoreContext = createGlobalDialogState({
    dialogText: '',
    dialogTitle: '',
    onConfirm: undefined,
});

export function getDialogContext(): Atom<DialogState> {
    return dialogCoreContext;
}
