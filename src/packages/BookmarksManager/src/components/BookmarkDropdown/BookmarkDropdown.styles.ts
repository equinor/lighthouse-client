import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const BookmarkWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
`;
export const BookmarkListWrapper = styled.div`
    max-height: 250px;
    overflow-y: auto;
`;

export const BookmarkEntry = styled.div`
    cursor: pointer;
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
export const CreateNewBookmarkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CreatingNewBookmarkWrapper = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
`;

export const TitleInput = styled.input`
    width: 150px;
`;
