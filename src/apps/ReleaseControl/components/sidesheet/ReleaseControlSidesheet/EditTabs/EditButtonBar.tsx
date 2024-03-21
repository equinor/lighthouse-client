import { Button, Progress } from '@equinor/eds-core-react-old';
import { disableEditMode } from '../../../../Atoms/editModeAtom';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import {
    useGetReleaseControl,
    useReleaseControlContext,
    useReleaseControlMutation,
    useRequestMutations,
} from '../../../../hooks';
import { releaseControlMutationKeys } from '../../../../queries/releaseControlMutationKeys';
import { ActionBar, ButtonContainer } from '../../../Form/releaseControlProcessForm.styles';
import { Typography } from '@equinor/eds-core-react';

export const EditButtonBar = (): JSX.Element => {
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const { patchKey } = releaseControlMutationKeys(releaseControl.id);
    const { refetch } = useGetReleaseControl(releaseControl.id);
    const isValid = DRCFormAtomApi.useIsValid();
    const { editReleaseControlMutation } = useRequestMutations();

    const { isLoading, mutate, isError } = useReleaseControlMutation(
        releaseControl.id,
        patchKey,
        editReleaseControlMutation,
        {
            onSuccess: async () => {
                await refetch();
                disableEditMode();
            },
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
        <>
            {isError && (
                <Typography variant="h3">
                    An error occured saving the RC. Please try again later.
                </Typography>
            )}
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
        </>
    );
};
