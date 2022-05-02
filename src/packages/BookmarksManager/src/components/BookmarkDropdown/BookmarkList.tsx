import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useGetBookmarks } from '../../hooks';
import { bookmarkEvents } from '../../utils';

type Props = {
    appKey: string;
};
const BookmarkListWrapper = styled.div`
    max-height: 250px;
    overflow-y: auto;
`;

const BookmarkEntry = styled.div`
    cursor: pointer;
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
export const BookmarkList = ({ appKey }: Props) => {
    const { bookmarks, isFetching, error } = useGetBookmarks(appKey);

    // if (isFetching) return <div>Fetching bookmarks</div>;
    if (!bookmarks || bookmarks.length === 0) return <div>No bookmarks</div>;
    // if (error) return <div>Error retrieving bookmarks</div>;

    const { applyBookmark, deleteBookmark } = bookmarkEvents;

    return (
        <BookmarkListWrapper>
            {bookmarks
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((bookmark) => {
                    return (
                        <BookmarkEntry
                            key={bookmark.id}
                            onClick={() =>
                                applyBookmark({
                                    id: bookmark.id,
                                    appKey: bookmark.appKey,
                                    subSystem: bookmark.sourceSystem.subSystem,
                                })
                            }
                        >
                            {bookmark.name} ({bookmark.sourceSystem.subSystem})
                        </BookmarkEntry>

                        // <div
                        //     key={bookmark.id}
                        //     style={{
                        //         display: 'flex',
                        //         flexDirection: 'row',
                        //         justifyContent: 'space-between',
                        //     }}
                        // >
                        //     <BookmarkEntry
                        //         key={bookmark.id}
                        //         onClick={() => applyBookmark(bookmark.id)}
                        //     >
                        //         {bookmark.name}
                        //     </BookmarkEntry>

                        //     <div onClick={() => deleteBookmark(bookmark.id)}>X</div>
                        // </div>
                    );
                })}
        </BookmarkListWrapper>
    );
};
