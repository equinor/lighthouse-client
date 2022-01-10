import { getDialogContext } from '../Context/dialogContext';
import { dispatch } from '../State/actions';

export function clearConfirmationDialog(): void {
    dispatch(getDialogContext(), () => {
        return {
            dialogText: '',
            dialogTitle: '',
            onConfirm: undefined,
        };
    });
}
