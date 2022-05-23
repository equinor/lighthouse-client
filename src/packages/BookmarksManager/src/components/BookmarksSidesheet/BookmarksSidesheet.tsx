import { useNavigate } from 'react-router';
import { useGetAllBookmarks } from '../..';
import { BookmarkResponse } from '../../types';

export const BookmarkSidesheet = () => {
    const { bookmarks, isLoading, error } = useGetAllBookmarks();

    if (isLoading) return <div>Loading</div>;
    if (error) return <div>{error.message}</div>;
    if (!bookmarks || bookmarks.length === 0) return <div>No bookmarks</div>;
    const bookmarksBySubsystemAppKey = groupBookmarksBySubSystemAppkey(bookmarks);
    const navigate = useNavigate();
    const handleClick = (bookmark: BookmarkResponse) => {};
    return (
        <div>
            {Object.keys(bookmarksBySubsystemAppKey).map((subSystemKey) => {
                return (
                    <div key={subSystemKey}>
                        <h3>{subSystemKey}</h3>
                        {Object.keys(bookmarksBySubsystemAppKey[subSystemKey]).map((appKey) => {
                            return (
                                <div key={appKey}>
                                    <h3>{appKey}</h3>
                                    {bookmarksBySubsystemAppKey[subSystemKey][appKey].map(
                                        (bookmark) => {
                                            return <div id={bookmark.id}>{bookmark.name}</div>;
                                        }
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
// type BookmarksBySubSystem = Record<string, BookmarkResponse[]>;
// export const groupBookmarksBySubSystem = (bookmarks: BookmarkResponse[]) => {
//     const bookmarksBySubSystem = bookmarks.reduce((acc, curr) => {
//         acc[curr.sourceSystem.subSystem] = acc[curr.sourceSystem.subSystem]
//             ? [...acc[curr.sourceSystem.subSystem], curr]
//             : [curr];

//         return acc;
//     }, {} as BookmarksBySubSystem);

//     return bookmarksBySubSystem;
// };
type BookmarksBySubSystemAppKey = Record<string, Record<string, BookmarkResponse[]>>;
export const groupBookmarksBySubSystemAppkey = (bookmarks: BookmarkResponse[]) => {
    const bookmarksBySubSystem = bookmarks.reduce((acc, curr) => {
        acc[curr.sourceSystem.subSystem] = acc[curr.sourceSystem.subSystem]
            ? { ...acc[curr.sourceSystem.subSystem], [curr.appKey]: [curr] }
            : {
                  [curr.appKey]: acc[curr.sourceSystem.subSystem]?.[curr.appKey]
                      ? [...acc[curr.sourceSystem.subSystem][curr.appKey], curr]
                      : [curr],
              };

        return acc;
    }, {} as BookmarksBySubSystemAppKey);

    return bookmarksBySubSystem;
};
