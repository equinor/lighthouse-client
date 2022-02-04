import { getDialogContext } from '../Context/dialogContext';
import { dispatch } from '../State/actions';

export function spawnConfirmationDialog(
    dialogText: string,
    dialogTitle: string,
    onConfirm: () => void
): void {
    dispatch(getDialogContext(), () => {
        return {
            dialogText,
            dialogTitle,
            onConfirm,
        };
    });
}
