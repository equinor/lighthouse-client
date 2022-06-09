import { Button, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { patchBookmark } from '../../..';
import { useBookmarkMutations } from '../../../hooks';
import { BookmarkResponse } from '../../../types';
import { ButtonContainer, InputContainer } from './modal.styles';

type EditModalContentProps = {
    bookmark: BookmarkResponse;
    closeModal: () => void;
};
export const EditModalContent = ({ bookmark, closeModal }: EditModalContentProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const editBookmark = useBookmarkMutations(patchBookmark, ['my-bookmarks']);

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };
    return (
        <>
            <InputContainer>
                <TextField
                    variant="default"
                    id="title"
                    label="Title"
                    placeholder={bookmark.name}
                    value={title}
                    onChange={onTitleChange}
                />
                <TextField
                    variant="default"
                    id="description"
                    label="Description"
                    placeholder={bookmark?.description}
                    value={description}
                    onChange={onDescriptionChange}
                    multiline
                />
            </InputContainer>

            <ButtonContainer>
                <Button
                    variant="contained"
                    onClick={() => {
                        editBookmark({
                            bookmarkId: bookmark.id,
                            name: title || bookmark.name,
                            description: description || bookmark?.description,
                        });
                        closeModal();
                    }}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        closeModal();
                        setTitle('');
                        setDescription('');
                    }}
                >
                    Close
                </Button>
            </ButtonContainer>
        </>
    );
};
