import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { BookmarkResponse } from '../../types';
import { BookmarkLink } from './BookmarksSidesheet.styles';
import { MenuOptions, createBookmarkURL } from './MenuOptions';
import { ClickableIcon } from '../../../../Components/Icon';
const Icons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`;
type BookmarkEntryProps = {
    subSystem: string;
    appKey: string;
    bookmark: BookmarkResponse;
};

const getBookmarkRedirect = (appKey: string, bookmarkId: string, subSystem: string) => {
    switch (appKey) {
        case 'handover':
            return `/ConstructionAndCommissioning/handover?bookmarkId=${bookmarkId}`;

        default:
            return `/${subSystem}/${appKey}?bookmarkId=${bookmarkId}`;
    }
};

export const BookmarkEntry = ({ appKey, bookmark, subSystem }: BookmarkEntryProps) => {
    return (
        <>
            <BookmarkLink
                to={getBookmarkRedirect(appKey, bookmark.id, subSystem)}
                title={bookmark?.description}
            >
                {bookmark.name}
            </BookmarkLink>
            <Icons>
                <MenuOptions bookmark={bookmark} />
                {bookmark.isShared && (
                    <ClickableIcon
                        name="share"
                        title="Shared"
                        onClick={() => {
                            navigator.clipboard.writeText(createBookmarkURL(bookmark));
                        }}
                        color={tokens.colors.interactive.primary__resting.hsla}
                    />
                )}
            </Icons>
        </>
    );
};
