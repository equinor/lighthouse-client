import { Button } from '@equinor/eds-core-react';
import { BookmarkResponse } from '../../../types';
type ShareModalContentProps = {
    bookmark: BookmarkResponse;
    closeModal: () => void;
};
export const ShareModalContent = ({ bookmark, closeModal }: ShareModalContentProps) => {
    return (
        <>
            <Button variant="outlined" onClick={() => closeModal()}>
                Close
            </Button>
        </>
    );
};
