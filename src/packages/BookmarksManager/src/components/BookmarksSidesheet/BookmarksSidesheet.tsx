import { Icon } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetAllBookmarks } from '../..';
import { BookmarkResponse } from '../../types';

export const BookmarkSidesheet = () => {
    const { bookmarks, isLoading, error } = useGetAllBookmarks();
    const navigate = useNavigate();
    const location = useLocation();

    if (isLoading) return <div>Loading</div>;
    if (error) return <div>{error.message}</div>;
    if (!bookmarks || bookmarks.length === 0) return <div>No bookmarks</div>;
    const bookmarksBySubsystemAppKey = groupBookmarksBySubSystemAppkey(bookmarks);
    return (
        <div>
            {Object.keys(bookmarksBySubsystemAppKey).map((subSystemKey) => {
                return (
                    <AppGroup
                        key={subSystemKey}
                        appGroupName={subSystemKey}
                        appGroupBookmarks={bookmarksBySubsystemAppKey[subSystemKey]}
                    />
                );
            })}
        </div>
    );
};

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
type AppGroupProps = {
    appGroupName: string;
    appGroupBookmarks: Record<string, BookmarkResponse[]>;
};
export const AppGroup = ({ appGroupBookmarks, appGroupName }: AppGroupProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h3>{appGroupName}</h3>
                <Icon
                    name={isOpen ? 'chevron_down' : 'chevron_up'}
                    onClick={() => setIsOpen((s) => !s)}
                />
            </div>
            {isOpen &&
                Object.keys(appGroupBookmarks).map((appKey) => {
                    return (
                        <AppBookmark
                            key={appKey}
                            appBookmarks={appGroupBookmarks[appKey]}
                            appKey={appKey}
                        />
                    );
                })}
        </div>
    );
};
type AppBookmarkProps = {
    appKey: string;
    appBookmarks: BookmarkResponse[];
};
export const AppBookmark = ({ appBookmarks, appKey }: AppBookmarkProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h4>{appKey}</h4>
                <Icon
                    name={isOpen ? 'chevron_down' : 'chevron_up'}
                    onClick={() => setIsOpen((s) => !s)}
                />
            </div>
            {isOpen &&
                appBookmarks.map((bookmark) => {
                    const appKey = bookmark.appKey
                        .replace('jc-', '')
                        .replaceAll(' ', '-')
                        .toLocaleLowerCase();
                    const subSystem = bookmark.sourceSystem.subSystem.replace(' ', '');
                    return (
                        <div key={bookmark.id}>
                            <Link to={`/${subSystem}/${appKey}?bookmarkId=${bookmark.id}`}>
                                {bookmark.name}
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
};
