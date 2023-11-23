import { useEffect, useState } from 'react';
import AppLoader from './AppLoader';
import { useMutation } from 'react-query';
import {
    BookmarkResponse,
    favouriteBookmark,
    headBookmark,
    useBookmarkMutations,
} from '../packages/BookmarksManager/src';
import { useFusionBookmarks } from '../hooks/useFusionBookmarks';
import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useCurrentUser } from '@equinor/lighthouse-portal-client';

const CenterInAvailableSpace = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    gap: 1em;
`;

export function AppLoaderWrapper({ appKey }: { appKey: string }) {
    const { isLoading, error } = useBoomark(appKey);
    const [bypass, setBypass] = useState(false);

    if (error && !bypass) {
        return (
            <CenterInAvailableSpace>
                <Typography variant="h2">Failed to load bookmark</Typography>
                <Button onClick={() => setBypass(true)}>Continue</Button>
            </CenterInAvailableSpace>
        );
    }

    return (
        <div style={{ height: '100%' }}>
            {isLoading && !bypass ? (
                <CenterInAvailableSpace>
                    <CircularProgress size={48} />
                    <div>Applying bookmark</div>
                </CenterInAvailableSpace>
            ) : (
                <AppLoader appKey={appKey} />
            )}
        </div>
    );
}

export function useBoomark(appKey: string) {
    const module = useFusionBookmarks();
    const user = useCurrentUser();
    const favourite = useBookmarkMutations(favouriteBookmark);

    const bookmarkId = new URL(window.location.href).searchParams.get('bookmarkId');
    const { isLoading, mutateAsync, error } = useMutation<BookmarkResponse, unknown, string>(
        [appKey, 'bookmarks', bookmarkId],
        async (props) => {
            const bookmark = await module.getBookmarkById(props);
            if (bookmark.createdBy.azureUniqueId !== user?.id) {
                // Check if bookmark is not already favourited by user
                !(await headBookmark(bookmark.id)) && favourite(bookmark.id);
            }
            module.setCurrentBookmark(bookmark);
            return bookmark;
        }
    );

    useEffect(() => {
        if (bookmarkId) {
            mutateAsync(bookmarkId);
        }

        return () => {
            module.setCurrentBookmark(undefined);
        };
    }, [bookmarkId]);

    return { isLoading, error };
}
