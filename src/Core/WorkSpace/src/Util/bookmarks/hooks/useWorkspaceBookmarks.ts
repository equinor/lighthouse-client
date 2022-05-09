import { useBookmarkEvents } from '@equinor/BookmarksManager';
import { useBookmarkContext } from '../../../Context/BookmarkContext';
import { WorkspaceBookmarkPayload } from '../types';

export const useWorkspaceBookmarks = () => {
    const { applyBookmark, saveBookmark } = useBookmarkContext<WorkspaceBookmarkPayload>();

    useBookmarkEvents({ applyFn: applyBookmark, saveFn: saveBookmark });
};
