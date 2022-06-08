export interface DialogState {
    dialogTitle: string;
    dialogText: string;
    onConfirm: (() => Promise<void> | void) | undefined;
}
