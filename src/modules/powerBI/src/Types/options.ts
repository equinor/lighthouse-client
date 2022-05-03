import { IReportEmbedConfiguration } from 'powerbi-client';

export type PowerBIBookmarkPayload = {
    /** Base64 string of the bookmark state */
    bookmarkState: string;
    /** Internal Page ID from PowerBI embed variable */
    name: string;
    /** Internal Title/Display name from PowerBI embed variable */
    displayName: string;
    /** Page ID that is handled outside of PowerBI component */
    mainPage?: string;
    /** Title/Diplay name that is handled outside of PowerBI component */
    mainPageDisplayName?: string;
};

export interface PBIOptions extends IReportEmbedConfiguration {
    showFilter?: boolean;
    enablePageNavigation?: boolean;
    defaultPage?: string;
    activePage?: string;
    activePageDisplayName?: string;
    pageLoad?: boolean;
    isFilterActive?: boolean;
    aspectRatio?: number;
    hasFilter?: (hasFilter: boolean) => void;
    persistPayload?: (
        capturedPayload: PowerBIBookmarkPayload,
        bookmarkTitle: string,
        appKey: string
    ) => void;
    applyBookmark?: (
        bookmarkId: string,
        appKey: string,
        groupName: string
    ) => Promise<PowerBIBookmarkPayload | undefined>;
}
