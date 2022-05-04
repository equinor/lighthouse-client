import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
export const BookmarkWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
`;
export const BookmarkListWrapper = styled.div`
    max-height: 250px;
    max-width: 250px;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const BookmarkEntry = styled.div`
    cursor: pointer;
    :hover {
        background-color: ${tokens.colors.ui.background__light.rgba};
        font-weight: 600;
    }
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
export const CreateNewBookmarkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
`;

export const CreatingNewBookmarkWrapper = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 1rem;
`;

export const TitleInput = styled.input`
    width: 150px;
    padding: 5px;
    :focus {
        border: 2px solid ${tokens.colors.interactive.focus.rgba};
        outline: none;
    }
`;

export const CreatingNewIcons = styled.div`
    display: flex;
    gap: 0.5rem;
`;
