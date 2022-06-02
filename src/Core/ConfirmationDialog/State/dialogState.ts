export interface DialogState {
    dialogTitle: string;
    dialogText: string;
    dialogChildren?: JSX.Element;
    onConfirm: (() => Promise<void> | void) | undefined;
}
