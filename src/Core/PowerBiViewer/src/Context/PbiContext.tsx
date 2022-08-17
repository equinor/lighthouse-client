import {
    ApplyEventArgs,
    favouriteBookmark,
    getBookmarkById,
    headBookmark,
    SaveArgs,
    useBookmarkMutations,
    useBookmarks,
} from '@equinor/BookmarksManager';
import { useCurrentUser } from '@equinor/lighthouse-portal-client';
import { PBIOptions, PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { Report } from 'powerbi-client';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { isDifferentPage } from '../Utils';

type Page = {
    pageId: string;
    pageTitle: string;
};
type PowerBiState = {
    report?: Report;
    pbiOptions?: PBIOptions;
    activePage?: Page;
};
type PbiContext = PowerBiState & {
    setReport: (report: Report | undefined) => void;
    handleApplyingBookmark: ({
        id: bookmarkId,
    }: ApplyEventArgs) => Promise<PowerBIBookmarkPayload | undefined>;
    handleSaveBookmarks: (saveArgs: SaveArgs<PowerBIBookmarkPayload>) => Promise<void>;
    setActivePage(page: Page, options?: PBIOptions): void;
    ready: boolean;
};

const PowerBiContext = createContext<PbiContext>({} as PbiContext);
export const PowerBiViewerContext = ({ children }: PropsWithChildren<{}>) => {
    const [state, setState] = useState<PowerBiState>();
    const [ready, setReady] = useState<boolean>(true);
    const { handleApplyBookmark, handleSaveBookmarks } = useBookmarks<PowerBIBookmarkPayload>();
    const favourite = useBookmarkMutations(favouriteBookmark);
    const user = useCurrentUser();

    const [searchParams] = useSearchParams();

    const setReport = (report: Report | undefined) => {
        report?.on('loaded', async () => {
            try {
                const active = await report.getActivePage();
                setState((s) => {
                    return {
                        ...s,
                        activePage: {
                            pageId: active.name,
                            pageTitle: active.displayName,
                        },

                        report: report,
                    };
                });
            } catch {
                console.error('Cannot set PBI report');
            }
        });
    };

    const setActivePage = useCallback((page: Page, pbiOptions?: PBIOptions) => {
        setState((s) => {
            return { ...s, activePage: page, pbiOptions: pbiOptions };
        });
    }, []);

    /**
     * Function to handle page navigation and bookmark apply.
     * Handles both redirect (meaning having bookmarkId=xxx in URL) and internal bookmarks
     *
     */
    const pageManager = (bookmark: PowerBIBookmarkPayload, isRedirect?: boolean) => {
        if (isDifferentPage(state?.activePage, bookmark)) {
            // If this is the first time loading the PBI component (external redirect)
            if (!state?.report) {
                // Using a helper state so we can control when the PBI component is mounted.
                setReady(false);
                setState((s) => ({
                    ...s,
                    pbiOptions: {
                        bookmark: { state: bookmark.bookmarkState },
                        defaultPage: bookmark?.name || bookmark.mainPage,
                    },
                }));

                setReady(true);
                return;
            } else {
                setActivePage({
                    pageId: bookmark?.mainPage || bookmark.name,
                    pageTitle: bookmark?.mainPageDisplayName || bookmark.displayName,
                });

                // If the PBI component is already mounted, and we use external bookmark, we need to apply the state manually
                if (isRedirect) {
                    state?.report &&
                        state.report.bookmarksManager.applyState(bookmark.bookmarkState);
                    return;
                } else {
                    return bookmark;
                }
            }
        } else {
            if (isRedirect) {
                state?.report && state.report.bookmarksManager.applyState(bookmark.bookmarkState);
                return;
            } else {
                return bookmark;
            }
        }
    };
    const handleApplyingBookmark = async ({ id: bookmarkId }: ApplyEventArgs) => {
        const bookmark = await handleApplyBookmark(bookmarkId);

        return pageManager(bookmark);
    };

    useEffect(() => {
        const bookmarkId = searchParams.get('bookmarkId');

        if (bookmarkId) {
            (async () => {
                const bookmarkRes = await getBookmarkById(bookmarkId);
                if (bookmarkRes) {
                    if (bookmarkRes.createdBy.azureUniqueId !== user?.id) {
                        //Check if bookmark is not already favourited by user
                        !(await headBookmark(bookmarkId)) && favourite(bookmarkId);
                    }
                    const bookmarkPayload = await handleApplyBookmark(bookmarkId);
                    pageManager(bookmarkPayload, true);
                }
            })();
        }
    }, [searchParams]);
    return (
        <PowerBiContext.Provider
            value={{
                ...state,
                ready,
                setReport,
                handleApplyingBookmark,
                handleSaveBookmarks,
                setActivePage,
            }}
        >
            {children}
        </PowerBiContext.Provider>
    );
};

export const usePowerBiContext = () => {
    return useContext(PowerBiContext);
};
