import { BookmarkResponse } from '../../types';

type BookmarksBySubSystemAppKey = Record<string, Record<string, BookmarkResponse[]>>;
export const groupBookmarksBySubSystemAppkey = (bookmarks: BookmarkResponse[]) => {
    const bookmarksBySubSystem = bookmarks.reduce((acc, curr) => {
        acc[curr.sourceSystem.subSystem] = {
            ...(acc[curr.sourceSystem.subSystem] ? acc[curr.sourceSystem.subSystem] : {}),
            [curr.appKey]: acc[curr.sourceSystem.subSystem]?.[curr.appKey]
                ? [...acc[curr.sourceSystem.subSystem][curr.appKey], curr]
                : [curr],
        };

        // acc[curr.sourceSystem.subSystem] = acc[curr.sourceSystem.subSystem]
        //     ? {
        //           ...acc[curr.sourceSystem.subSystem],
        //           [curr.appKey]: acc[curr.sourceSystem.subSystem]?.[curr.appKey]
        //               ? [...acc[curr.sourceSystem.subSystem][curr.appKey], curr]
        //               : [curr],
        //       }
        //     : {
        //           [curr.appKey]: acc[curr.sourceSystem.subSystem]?.[curr.appKey]
        //               ? [...acc[curr.sourceSystem.subSystem][curr.appKey], curr]
        //               : [curr],
        //       };

        return acc;
    }, {} as BookmarksBySubSystemAppKey);

    return bookmarksBySubSystem;
};
