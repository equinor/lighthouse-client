import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { BookmarkResponse } from '../../types';
import { BookmarkLink } from './BookmarksSidesheet.styles';
import { MenuOptions } from './MenuOptions';

type BookmarkEntryProps = {
    subSystem: string;
    appKey: string;
    bookmark: BookmarkResponse;
};
export const BookmarkEntry = ({ appKey, bookmark, subSystem }: BookmarkEntryProps) => {
    return (
        <>
            <BookmarkLink
                to={`/${subSystem}/${appKey}?bookmarkId=${bookmark.id}`}
                title={bookmark?.description}
            >
                {bookmark.name}
            </BookmarkLink>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                <MenuOptions bookmark={bookmark} />
                {bookmark.isShared && (
                    <Icon
                        name="share"
                        title="Shared"
                        color={tokens.colors.interactive.primary__resting.hsla}
                    />
                )}
            </div>
        </>
    );
};
