import { useAtom } from '@dbeining/react-atom';
import { useState } from 'react';
import { getDialogContext } from '../Context/dialogContext';
import { DialogState } from '../State/dialogState';

export const useConfirmationDialog = (): DialogState | undefined => {
    const state = useAtom(getDialogContext());

    return {
        dialogText: state.dialogText || '',
        dialogTitle: state.dialogTitle || '',
        onConfirm: state.onConfirm,
    };
};
