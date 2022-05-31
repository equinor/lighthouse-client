import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { useGetAllBookmarks } from '../..';
import { AppGroup } from './AppGroup';
import { SidesheetContent } from './BookmarksSidesheet.styles';
import { groupBookmarksBySubSystemAppkey } from './groupBookmarksBySubSystemAppKey';
type BookmarksSidesheetProps = {
    actions: SidesheetApi;
};
export const BookmarkSidesheet = ({ actions }: BookmarksSidesheetProps) => {
    const { bookmarks, isLoading, error } = useGetAllBookmarks();

    useEffect(() => {
        actions.setTitle('Bookmarks');
    }, []);

    if (isLoading) return <div>Loading</div>;
    if (error) return <div>{error.message}</div>;
    if (!bookmarks || bookmarks.length === 0) return <div>No bookmarks</div>;
    const bookmarksBySubsystemAppKey = groupBookmarksBySubSystemAppkey(bookmarks);
    return (
        <SidesheetContent>
            {Object.keys(bookmarksBySubsystemAppKey).map((subSystemKey) => {
                return (
                    <AppGroup
                        key={subSystemKey}
                        appGroupName={subSystemKey}
                        appGroupBookmarks={bookmarksBySubsystemAppKey[subSystemKey]}
                    />
                );
            })}
        </SidesheetContent>
    );
};
