import { Button } from '@equinor/eds-core-react';
import { useDeleteBookmark } from '../../../hooks/useDeleteBookmark';
import { BookmarkResponse } from '../../../types';
import { ButtonContainer } from './modal.styles';

type DeleteModalContentProps = {
    bookmark: BookmarkResponse;
    closeModal: () => void;
};
export const DeleteModalContent = ({ bookmark, closeModal }: DeleteModalContentProps) => {
    const deleteBookmark = useDeleteBookmark('my-bookmarks');
    return (
        <>
            <div>Are you sure you want to delete this bookmark? </div>

            <ButtonContainer>
                <Button
                    onClick={() => {
                        deleteBookmark(bookmark.id);
                        closeModal();
                    }}
                    color="danger"
                    variant="outlined"
                >
                    Delete
                </Button>
                <Button onClick={() => closeModal()} variant="outlined">
                    Close
                </Button>
            </ButtonContainer>
        </>
    );
};
