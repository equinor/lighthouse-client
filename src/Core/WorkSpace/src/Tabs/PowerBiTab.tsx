import { useBookmarks } from '@equinor/BookmarksManager';
import { PowerBI, PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import styled from 'styled-components';
import { useDataContext } from '../Context/DataProvider';
import { useViewerContext } from '../Context/ViewProvider';

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const PowerBiTab = (): JSX.Element | null => {
    const { powerBiOptions } = useDataContext();
    const { activePage, isFilterActive, setActivePage } = useViewerContext();
    const { handleApplyBookmark, handleSaveBookmarks } = useBookmarks<
        PowerBIBookmarkPayload,
        PowerBIBookmarkPayload
    >();

    const handleApplyingBookmark = async (bookmarkId: string) => {
        const bookmark = await handleApplyBookmark(bookmarkId);
        setActivePage({
            pageId: bookmark?.mainPage || bookmark.name,
            pageTitle: bookmark?.mainPageDisplayName || bookmark.displayName,
        });
        return bookmark;
    };
    if (powerBiOptions) {
        return (
            <Wrapper>
                <PowerBI
                    reportUri={powerBiOptions?.reportURI}
                    filterOptions={powerBiOptions.filter}
                    options={{
                        ...powerBiOptions.options,
                        activePage: activePage?.pageId,
                        isFilterActive,
                        defaultPage: activePage?.pageId,
                        activePageDisplayName: activePage?.pageTitle,

                        persistPayload: handleSaveBookmarks,
                        applyBookmark: handleApplyingBookmark,
                    }}
                />
            </Wrapper>
        );
    }
    return null;
};
