import { Button, Progress } from '@equinor/eds-core-react';
import { disableEditMode } from '../../../../Atoms/editModeAtom';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import {
    useReleaseControlContext,
    useReleaseControlMutation,
    useRequestMutations,
} from '../../../../hooks';
import { releaseControlMutationKeys } from '../../../../queries/releaseControlMutationKeys';
import { ActionBar, ButtonContainer } from '../../../Form/releaseControlProcessForm.styles';

export const EditButtonBar = (): JSX.Element => {
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const { patchKey } = releaseControlMutationKeys(releaseControl.id);

    const isValid = DRCFormAtomApi.useIsValid();

    const { editReleaseControlMutation } = useRequestMutations();

    const { isLoading, mutate } = useReleaseControlMutation(
        releaseControl.id,
        patchKey,
        editReleaseControlMutation,
        {
            onSuccess: disableEditMode,
        }
    );

    const handleSave = (setAsOpen: boolean) => {
        const { prepareReleaseControl } = DRCFormAtomApi;
        mutate({
            model: prepareReleaseControl(),
            setAsOpen: setAsOpen,
        });
    };

    return (
        <ActionBar>
            <ButtonContainer>
                <>
                    {isLoading ? (
                        <Button variant="ghost_icon" disabled>
                            <Progress.Dots color="primary" />
                        </Button>
                    ) : (
                        <>
                            <Button variant="outlined" onClick={disableEditMode}>
                                Cancel
                            </Button>
                            <Button disabled={!isValid} onClick={() => handleSave(false)}>
                                Save
                            </Button>
                            {releaseControl.state === 'Draft' && (
                                <Button disabled={!isValid} onClick={() => handleSave(true)}>
                                    Submit
                                </Button>
                            )}
                        </>
                    )}
                </>
            </ButtonContainer>
        </ActionBar>
    );
};
