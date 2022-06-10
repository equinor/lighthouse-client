import { PowerBI, PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import styled from 'styled-components';
import { useBookmarkContext } from '../Context/BookmarkContext';
import { useDataContext } from '../Context/DataProvider';
import { useViewerContext } from '../Context/ViewProvider';

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f7f7f7;
`;

export const PowerBiTab = (): JSX.Element | null => {
    const { powerBiOptions } = useDataContext();
    const { activePage, isFilterActive, setActivePage, pbiOptions } = useViewerContext();
    const { applyBookmark, saveBookmark } = useBookmarkContext<PowerBIBookmarkPayload>();
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
                        bookmark: pbiOptions?.bookmark,
                        persistPayload: saveBookmark,
                        applyBookmark: applyBookmark,
                    }}
                />
            </Wrapper>
        );
    }
    return null;
};
