import { Button } from '@equinor/eds-core-react-old';
import { deleteBookmark as deleteBookmarkFunc, useBookmarkMutations } from '../../..';
import { BookmarkResponse } from '../../../types';
import { ButtonContainer } from './modal.styles';

type DeleteModalContentProps = {
  bookmark: BookmarkResponse;
  closeModal: () => void;
};
export const DeleteModalContent = ({ bookmark, closeModal }: DeleteModalContentProps) => {
  const deleteBookmark = useBookmarkMutations(deleteBookmarkFunc);
  return (
    <>
      <div>
        {bookmark.isShared
          ? 'By deleting this bookmark, it will also be removed from the people you have shared it with'
          : 'Are you sure you want to delete this bookmark?'}
      </div>

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
