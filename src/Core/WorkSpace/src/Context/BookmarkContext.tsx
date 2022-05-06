import { deref } from '@dbeining/react-atom';
import {
    ApplyEventArgs,
    SaveArgs,
    SaveEventArgs,
    useBookmarkEvents,
    useBookmarks,
} from '@equinor/BookmarksManager';
import { FilterGroup, useFilterApiContext } from '@equinor/filter';
import { PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { createContext, PropsWithChildren, useContext } from 'react';
import { gardenApiAtom } from '../Util/gardenBookmarks/gardenApiAtom';
import { WorkspaceTab } from '../WorkSpaceApi/workspaceState';
import { useLocationContext } from './LocationProvider';
import { useViewerContext } from './ViewProvider';
type GardenPayload = {
    customGroupByKeys?: Record<string, unknown>;
    gardenKey?: string;
    groupByKeys?: string[];
};
export type WorkspaceBookmarkPayload = {
    activeTab: WorkspaceTab;
    garden: GardenPayload;
    filter: FilterGroup[];
};
type SavePBIWorkspaceBookmark = (saveEventArgs: SaveArgs<PowerBIBookmarkPayload>) => Promise<void>;
type SaveWorkspaceBookmark = (saveEventArgs: SaveEventArgs) => Promise<void>;

type SaveBookmark<T> = T extends PowerBIBookmarkPayload
    ? SavePBIWorkspaceBookmark
    : T extends WorkspaceBookmarkPayload
    ? SaveWorkspaceBookmark
    : unknown;
type ApplyBookmark<T> = T extends PowerBIBookmarkPayload
    ? PowerBIBookmarkPayload | undefined
    : T extends WorkspaceBookmarkPayload
    ? void
    : unknown;

type Context<T> = {
    applyBookmark: (args: ApplyEventArgs) => Promise<ApplyBookmark<T>>;
    saveBookmark: SaveBookmark<T>;
};
const isWorkspaceBookmark = (
    bookmark: Awaited<WorkspaceBookmarkPayload | PowerBIBookmarkPayload | never>
): bookmark is WorkspaceBookmarkPayload => {
    return (bookmark as WorkspaceBookmarkPayload)?.activeTab !== undefined;
};
const BookmarkContext = createContext({} as Context<unknown>);

type BookmarkContextWrapperProps = {};

export const BookmarkContextWrapper = ({
    children,
}: PropsWithChildren<BookmarkContextWrapperProps>): JSX.Element => {
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
            handleSetActiveTab('analytics');
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
            gardenApi.mutations.setGardenKey(bookmark.garden?.gardenKey);
        }
        setFilterState(bookmark.filter);
    };
    const applyBookmark = async ({ id }: ApplyEventArgs) => {
        const bookmark = await handleApplyBookmark(id);
        if (!isWorkspaceBookmark(bookmark)) {
            handlePowerBiApply(bookmark);
        } else {
            handleWorkspaceApply(bookmark);
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

export const useWorkspaceBookmarks = () => {
    const { applyBookmark, saveBookmark } = useBookmarkContext<WorkspaceBookmarkPayload>();

    useBookmarkEvents({ applyFn: applyBookmark, saveFn: saveBookmark });
};
