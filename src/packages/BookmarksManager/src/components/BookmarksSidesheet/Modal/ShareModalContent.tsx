import { Button } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { BookmarkResponse } from '../../../types';
import { ButtonContainer } from './modal.styles';
const ShareContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    column-gap: 10px;
`;
const InputContainer = styled.div`
    background-color: #f1f3f4;
    height: 30px;
    width: 100%;
    padding: 5px;
    border-radius: 0.5em;
`;
const Input = styled.input`
    background-color: transparent;
    border-width: 0;
    text-overflow: ellipsis;
    width: inherit;
    line-height: 2em;
`;
type ShareModalContentProps = {
    bookmark: BookmarkResponse;
    closeModal: () => void;
};
export const ShareModalContent = ({ bookmark, closeModal }: ShareModalContentProps) => {
    const bookmarkShareUrl = `${window.location.origin}/${bookmark.sourceSystem.subSystem.replace(
        'jc-',
        ''
    )}/${bookmark.appKey.replace('jc-', '')}?bookmarkId=${bookmark.id}`;

    return (
        <div style={{ width: '500px' }}>
            <div>This URL has been copied:</div>
            <ShareContainer>
                <InputContainer>
                    <Input
                        type="text"
                        readOnly
                        value={bookmarkShareUrl}
                        onFocus={(e) => e.target.select()}
                    />
                </InputContainer>

                <Button
                    variant="ghost"
                    onClick={() => navigator.clipboard.writeText(bookmarkShareUrl)}
                >
                    Copy
                </Button>
            </ShareContainer>
            <ButtonContainer>
                <Button variant="outlined" onClick={() => closeModal()}>
                    Close
                </Button>
            </ButtonContainer>
        </div>
    );
};
