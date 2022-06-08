import { Button } from '@equinor/eds-core-react';
import { useUnfavouriteBookmark } from '../../..';
import { BookmarkResponse } from '../../../types';
import { ButtonContainer } from './modal.styles';
type UnfavouriteModalContentProps = {
    bookmark: BookmarkResponse;
    closeModal: () => void;
};
export const UnfavouriteModalContent = ({ bookmark, closeModal }: UnfavouriteModalContentProps) => {
    const unfavouriteBookmark = useUnfavouriteBookmark('my-bookmarks');
    return (
        <>
            <div>Are you sure you want to remove this bookmark?</div>
            <ButtonContainer>
                <Button
                    variant="outlined"
                    color="danger"
                    onClick={() => {
                        unfavouriteBookmark(bookmark.id);
                        closeModal();
                    }}
                >
                    Remove
                </Button>
                <Button variant="outlined" onClick={() => closeModal()}>
                    Close
                </Button>
            </ButtonContainer>
        </>
    );
};
