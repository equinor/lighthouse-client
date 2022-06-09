import { Button } from '@equinor/eds-core-react';
import { patchBookmark } from '../../..';
import { useBookmarkMutations } from '../../../hooks';
import { BookmarkResponse } from '../../../types';
import { ButtonContainer } from './modal.styles';
type UnshareModalContentProps = {
    bookmark: BookmarkResponse;
    closeModal: () => void;
};
export const UnshareModalContent = ({ bookmark, closeModal }: UnshareModalContentProps) => {
    const editBookmark = useBookmarkMutations(patchBookmark, ['my-bookmarks']);

    return (
        <>
            By unsharing this bookmark, it will also be removed from the people you have shared it
            with.
            <ButtonContainer>
                <Button
                    variant="outlined"
                    color="danger"
                    onClick={() => {
                        editBookmark({ bookmarkId: bookmark.id, isShared: false });
                        closeModal();
                    }}
                >
                    Unshare
                </Button>
                <Button variant="outlined" onClick={() => closeModal()}>
                    Cancel
                </Button>
            </ButtonContainer>
        </>
    );
};
