import { SaveArgs, SaveEventArgs } from '@equinor/BookmarksManager';
import { PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { WorkspaceBookmarkPayload } from './workspaceBookmarkPayload';

type SavePBIWorkspaceBookmark = (saveEventArgs: SaveArgs<PowerBIBookmarkPayload>) => Promise<void>;
type SaveWorkspaceBookmark = (saveEventArgs: SaveEventArgs) => Promise<void>;

export type SaveBookmark<T> = T extends PowerBIBookmarkPayload
    ? SavePBIWorkspaceBookmark
    : T extends WorkspaceBookmarkPayload
    ? SaveWorkspaceBookmark
    : never;
export type ApplyBookmark<T> = T extends PowerBIBookmarkPayload
    ? PowerBIBookmarkPayload | undefined
    : T extends WorkspaceBookmarkPayload
    ? void
    : never;
