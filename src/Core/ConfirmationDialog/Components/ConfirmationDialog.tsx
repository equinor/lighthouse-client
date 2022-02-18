import { Button, Dialog, Scrim } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { clearConfirmationDialog } from '../Functions/clearConfirmationDialog';
import { useConfirmationDialog } from '../Hooks/useConfirmationDialog';

export const ConfirmationDialog = (): JSX.Element | null => {
    const dialog = useConfirmationDialog();
    if (!dialog?.onConfirm) {
        return null;
    }

    return (
        <>
            <Scrim isDismissable={false} style={{ zIndex: 1000 }}>
                <DialogContainer>
                    <DialogPadding>
                        <TitleSection>{dialog.dialogTitle}</TitleSection>
                        <p>{dialog.dialogText}</p>
                        <ButtonContainer>
                            <Button
                                onClick={() => {
                                    clearConfirmationDialog();
                                }}
                                variant={'outlined'}
                                color={'danger'}
                            >
                                Cancel
                            </Button>
                            <HorizontalDivider />
                            <Button
                                onClick={async () => {
                                    clearConfirmationDialog();
                                    dialog.onConfirm && (await dialog.onConfirm());
                                }}
                            >
                                Ok
                            </Button>
                        </ButtonContainer>
                    </DialogPadding>
                </DialogContainer>
            </Scrim>
        </>
    );
};

const DialogContainer = styled(Dialog)`
    width: 100%;
    padding: 0.8rem 0.8rem;
    min-width: 350px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5em;
    align-items: center;
`;

const HorizontalDivider = styled.div`
    padding-left: 1.5em;
`;

const DialogPadding = styled.div`
    padding-left: 1em;
    padding-right: 1em;
`;

const TitleSection = styled.h2`
    width: 100%;
`;
