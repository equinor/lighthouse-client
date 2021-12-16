import { Button, Dialog, Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';

interface ConfirmationDialogProps {
    onConfirm: () => void;
    onReject: () => void;
    dialogTitle: string;
    dialogText: string;
}

export const ConfirmationDialog = ({
    onConfirm,
    onReject,
    dialogText,
    dialogTitle,
}: ConfirmationDialogProps): JSX.Element => {
    return (
        <>
            <Scrim isDismissable={false}>
                <Dialog style={{ width: 'auto' }}>
                    <DialogPadding>
                        <h2>{dialogTitle}</h2>
                        <p>{dialogText}</p>
                        <ButtonContainer>
                            <Button
                                onClick={() => {
                                    onReject && onReject();
                                }}
                                variant={'ghost_icon'}
                                color={'danger'}
                            >
                                Cancel
                            </Button>
                            <HorizontalDivider />
                            <Button
                                variant={'ghost_icon'}
                                onClick={() => {
                                    onConfirm && onConfirm();
                                }}
                            >
                                Ok
                            </Button>
                        </ButtonContainer>
                    </DialogPadding>
                </Dialog>
            </Scrim>
        </>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5em;
`;

const HorizontalDivider = styled.div`
    padding-left: 1.5em;
`;

const DialogPadding = styled.div`
    padding-left: 1em;
    padding-right: 1em;
`;
