import { deref } from '@dbeining/react-atom';
import { ApplyEventArgs, SaveEventArgs, useBookmarks } from '@equinor/BookmarksManager';
import { useFilterApiContext } from '@equinor/filter';
import { PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import {
    ApplyBookmark,
    GardenPayload,
    SaveBookmark,
    WorkspaceBookmarkPayload,
} from '../Util/bookmarks/types';
import { useLocationContext } from './LocationProvider';
import { useViewerContext } from './ViewProvider';
import { isWorkspaceBookmark } from '../Util/bookmarks/helpers';
import { gardenApiAtom } from '../Util/bookmarks/gardenBookmarks';
import { useSearchParams } from 'react-router-dom';

type Context<T> = {
    applyBookmark: (args: ApplyEventArgs) => Promise<ApplyBookmark<T>>;
    saveBookmark: SaveBookmark<T>;
};

const BookmarkContext = createContext(
    {} as Context<PowerBIBookmarkPayload | WorkspaceBookmarkPayload>
);

type BookmarkContextWrapperProps = {};

export const BookmarkContextWrapper = ({
    children,
}: PropsWithChildren<BookmarkContextWrapperProps>): JSX.Element => {
    const [searchParams] = useSearchParams();

    const {
        filterState: { getFilterState },
        operations: { setFilterState },
    } = useFilterApiContext();

    const { activeTab, handleSetActiveTab } = useLocationContext();
    const { setActivePage } = useViewerContext();
    const { handleApplyBookmark, handleSaveBookmarks } = useBookmarks<
        PowerBIBookmarkPayload | WorkspaceBookmarkPayload
    >();

    const handlePowerBiApply = (
        bookmark: PowerBIBookmarkPayload
    ): PowerBIBookmarkPayload | void => {
        if (activeTab !== 'analytics') {
            setActivePage(
                {
                    pageId: bookmark?.mainPage || bookmark.name,
                    pageTitle: bookmark?.mainPageDisplayName || bookmark.displayName,
                },
                {
                    bookmark: { state: bookmark.bookmarkState },
                    defaultPage: bookmark?.mainPage || bookmark.name,
                }
            );
            handleSetActiveTab('analytics');
            return;
        } else {
            setActivePage({
                pageId: bookmark?.mainPage || bookmark.name,
                pageTitle: bookmark?.mainPageDisplayName || bookmark.displayName,
            });
            return bookmark;
        }
    };

    const handleWorkspaceApply = (bookmark: WorkspaceBookmarkPayload) => {
        if (bookmark.activeTab !== activeTab) {
            handleSetActiveTab(bookmark.activeTab);
        }
        const gardenApi = deref(gardenApiAtom);
        if (gardenApi && bookmark.activeTab === 'garden') {
            gardenApi.mutations.setGroupKeys(bookmark.garden?.groupByKeys || []);
            gardenApi.mutations.setCustomGroupKeys(bookmark.garden?.customGroupByKeys || {});
            gardenApi.mutations.setGardenKey(
                bookmark.garden?.gardenKey || gardenApi.states.getGardenKey()
            );
        }
        setFilterState(bookmark.filter);
    };
    const applyBookmark = async ({ id }: ApplyEventArgs) => {
        const bookmark = await handleApplyBookmark(id);
        if (isWorkspaceBookmark(bookmark)) {
            handleWorkspaceApply(bookmark);
        } else {
            return handlePowerBiApply(bookmark);
        }
    };

    const handleWorkspaceSave = async ({ appKey, subSystem, title }: SaveEventArgs) => {
        const filterState = getFilterState();
        const gardenApi = deref(gardenApiAtom);
        let gardenPayload: GardenPayload = {};
        if (gardenApi) {
            gardenPayload = {
                customGroupByKeys: gardenApi.states.getCustomGroupByKeys(),
                gardenKey: gardenApi.states.getGardenKey(),
                groupByKeys: gardenApi.states.getCurrentGroupByKeys(),
            };
        }

        const bookmarkPayload: WorkspaceBookmarkPayload = {
            activeTab,
            garden: gardenPayload,
            filter: filterState,
        };

        await handleSaveBookmarks({
            capturedBookmark: bookmarkPayload,
            appKey,
            subSystem,
            bookmarkTitle: title,
        });
    };
    const saveBookmark = (): SaveBookmark<WorkspaceBookmarkPayload | PowerBIBookmarkPayload> => {
        if (activeTab === 'analytics') {
            return handleSaveBookmarks;
        } else {
            return handleWorkspaceSave;
        }
    };
    useEffect(() => {
        const bookmarkId = searchParams.get('bookmarkId');
        if (bookmarkId) {
            (async () => {
                const bookmark = await handleApplyBookmark(bookmarkId);
                if (isWorkspaceBookmark(bookmark)) {
                    handleWorkspaceApply(bookmark);
                } else {
                    return handlePowerBiApply(bookmark);
                }
            })();
        }
    }, [searchParams]);
    return (
        <BookmarkContext.Provider value={{ applyBookmark, saveBookmark: saveBookmark() }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarkContext = <
    T extends PowerBIBookmarkPayload | WorkspaceBookmarkPayload
>(): Context<T> => {
    return useContext(BookmarkContext);
};
