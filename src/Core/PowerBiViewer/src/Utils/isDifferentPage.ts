import { PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { Page } from '../Types/State';

export const isDifferentPage = (activePage: Page | undefined, bookmark: PowerBIBookmarkPayload) => {
    if (bookmark?.mainPageDisplayName && bookmark?.mainPage) {
        return (
            activePage?.pageId !== bookmark.mainPage ||
            !activePage?.pageTitle.startsWith(bookmark.mainPageDisplayName)
        );
    } else return false;
};
