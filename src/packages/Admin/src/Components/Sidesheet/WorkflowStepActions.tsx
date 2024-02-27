import { Button, Progress } from '@equinor/eds-core-react';
import { ActionBar, ButtonContainer } from './sidesheet.styles';
import { useFormikContext } from 'formik';

type WorkflowStepActionsProps = {
    readonly isLoading: boolean;
    readonly onClose: () => void;
};

export const WorkflowStepActions = (props: WorkflowStepActionsProps): JSX.Element => {
    const { isLoading, onClose } = props;

    const { submitForm, isValid } = useFormikContext();

    const onSubmit = async () => {
        await submitForm();
    };

    const onSubmitAndClose = async () => {
        await submitForm();
        onClose();
    };

    if (isLoading) {
        return (
            <Button variant="ghost_icon" disabled>
                <Progress.Dots color="primary" />
            </Button>
        );
    }

    return (
        <ActionBar>
            <ButtonContainer>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={!isValid} onClick={onSubmit}>
                    Save
                </Button>
                <Button disabled={!isValid} onClick={onSubmitAndClose}>
                    Save and close
                </Button>
            </ButtonContainer>
        </ActionBar>
    );
};
