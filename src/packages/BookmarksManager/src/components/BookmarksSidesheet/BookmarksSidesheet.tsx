import { useRegistry } from '@equinor/lighthouse-portal-client';
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
    if (!bookmarks || bookmarks.length === 0)
        return <h1 style={{ textAlign: 'center' }}>No bookmarks</h1>;
    const bookmarksBySubsystemAppKey = groupBookmarksBySubSystemAppkey(bookmarks);
    const { appGroups } = useRegistry();
    return (
        <SidesheetContent>
            {Object.keys(bookmarksBySubsystemAppKey).map((subSystemKey) => {
                return (
                    <AppGroup
                        key={subSystemKey}
                        appGroupName={appGroups[subSystemKey].name}
                        appGroupBookmarks={bookmarksBySubsystemAppKey[subSystemKey]}
                    />
                );
            })}
        </SidesheetContent>
    );
};
