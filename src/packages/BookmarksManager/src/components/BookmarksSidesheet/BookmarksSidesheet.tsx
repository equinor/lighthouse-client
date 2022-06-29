import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useRegistry } from '@equinor/lighthouse-portal-client';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { useGetAllBookmarks } from '../..';
import { AppGroup } from './AppGroup';
import { Center, InfoText, SidesheetContent } from './BookmarksSidesheet.styles';
import { groupBookmarksBySubSystemAppkey } from './groupBookmarksBySubSystemAppKey';
type BookmarksSidesheetProps = {
    actions: SidesheetApi;
};

export const BookmarkSidesheet = ({ actions }: BookmarksSidesheetProps) => {
    const { bookmarks, isLoading, error } = useGetAllBookmarks();

    useEffect(() => {
        actions.setTitle('Bookmarks');
    }, []);

    const { appGroups } = useRegistry();
    if (isLoading)
        return (
            <Center>
                <Icon
                    name="info_circle"
                    size={40}
                    color={tokens.colors.interactive.primary__resting.hsla}
                />
                <InfoText>No bookmarks</InfoText>
            </Center>
        );
    if (error) return <div>{error.message}</div>;
    if (!bookmarks || bookmarks.length === 0)
        return (
            <Center>
                <Icon name="info_circle" size={32} />
                <InfoText>No bookmarks</InfoText>
            </Center>
        );
    const bookmarksBySubsystemAppKey = groupBookmarksBySubSystemAppkey(bookmarks);
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
