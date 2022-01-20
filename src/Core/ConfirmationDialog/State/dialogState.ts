export interface DialogState {
    dialogTitle: string;
    dialogText: string;
    onConfirm: (() => void) | undefined;
}
