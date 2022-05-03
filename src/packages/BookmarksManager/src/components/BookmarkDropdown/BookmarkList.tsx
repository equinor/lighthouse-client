import { useGetBookmarks } from '../../hooks';
import { useDeleteBookmark } from '../../hooks/useDeleteBookmark';
import { bookmarkEvents } from '../../utils';
import { BookmarkEntry, BookmarkListWrapper, BookmarkWrapper } from './BookmarkDropdown.styles';

type BookmarkListProps = {
    appKey: string;
};

export const BookmarkList = ({ appKey }: BookmarkListProps) => {
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
                            >
                                {bookmark.name}
                            </BookmarkEntry>
                            <div onClick={() => deleteBookmark(bookmark.id)}>X</div>
                        </BookmarkWrapper>
                    );
                })}
        </BookmarkListWrapper>
    );
};
