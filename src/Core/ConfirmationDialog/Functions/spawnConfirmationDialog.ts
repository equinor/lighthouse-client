import { getDialogContext } from '../Context/dialogContext';
import { dispatch } from '../State/actions';

export function spawnConfirmationDialog(
    dialogText: string,
    dialogTitle: string,
    onConfirm: () => void | Promise<void>,
    dialogChildren?: JSX.Element
): void {
    dispatch(getDialogContext(), () => {
        return {
            dialogText,
            dialogTitle,
            dialogChildren,
            onConfirm,
        };
    });
}
