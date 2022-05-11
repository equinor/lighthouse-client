import { PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { WorkspaceBookmarkPayload } from '../types';

export const isWorkspaceBookmark = (
    bookmark: Awaited<WorkspaceBookmarkPayload | PowerBIBookmarkPayload | never>
): bookmark is WorkspaceBookmarkPayload => {
    return (bookmark as WorkspaceBookmarkPayload)?.activeTab !== undefined;
};
