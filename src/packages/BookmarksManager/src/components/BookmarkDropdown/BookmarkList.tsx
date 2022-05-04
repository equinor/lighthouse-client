import { ClickableIcon } from '@equinor/lighthouse-components';
import { useGetBookmarks } from '../../hooks';
import { useDeleteBookmark } from '../../hooks/useDeleteBookmark';
import { bookmarkEvents } from '../../utils';
import { BookmarkEntry, BookmarkListWrapper, BookmarkWrapper } from './BookmarkDropdown.styles';

type BookmarkListProps = {
    appKey: string;
};

export const BookmarkList = ({ appKey }: BookmarkListProps): JSX.Element => {
    const { bookmarks, isFetching, error } = useGetBookmarks(appKey);
    const deleteBookmark = useDeleteBookmark();

    if (isFetching) return <div>Fetching bookmarks</div>;
    if (!bookmarks || bookmarks.length === 0) return <div>No bookmarks</div>;
    if (error) return <div>Error retrieving bookmarks</div>;

    const { applyBookmark } = bookmarkEvents;

    return (
        <BookmarkListWrapper>
            {bookmarks
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((bookmark) => {
                    return (
                        <BookmarkWrapper key={bookmark.id}>
                            <BookmarkEntry
                                onClick={(e) => {
                                    applyBookmark({
                                        id: bookmark.id,
                                        appKey: bookmark.appKey,
                                        subSystem: bookmark.sourceSystem.subSystem,
                                    });
                                    e.stopPropagation();
                                }}
                                title={bookmark.name}
                            >
                                {bookmark.name}
                            </BookmarkEntry>
                            <div title="Delete bookmark">
                                <ClickableIcon
                                    name="delete_to_trash"
                                    onClick={() => deleteBookmark(bookmark.id)}
                                />
                            </div>
                        </BookmarkWrapper>
                    );
                })}
        </BookmarkListWrapper>
    );
};
