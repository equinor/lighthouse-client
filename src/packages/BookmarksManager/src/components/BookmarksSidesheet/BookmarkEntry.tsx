import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { BookmarkResponse } from '../../types';
import { BookmarkLink } from './BookmarksSidesheet.styles';
import { MenuOptions, createBookmarkURL } from './MenuOptions';
import { ClickableIcon } from '../../../../Components/Icon';
const Icons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`;
type BookmarkEntryProps = {
    subSystem: string;
    appKey: string;
    bookmark: BookmarkResponse;
    isOldApplication: boolean;
};

const getBookmarkRedirect = (
    appKey: string,
    bookmarkId: string,
    subSystem: string,
    isOldApplication: boolean
) => {
    if (isOldApplication) {
        return `/${subSystem}/${appKey}?bookmarkId=${bookmarkId}`;
    }

    switch (appKey) {
        case 'handover':
            return `/ConstructionAndCommissioning/handover-new?bookmarkId=${bookmarkId}`;

        case 'mechanical-completion':
            return `/ConstructionAndCommissioning/mechanical-completion?bookmarkId=${bookmarkId}`;

        case 'jca-job-analytics':
            return `/ConstructionAndCommissioning/jca-job-analytics?bookmarkId=${bookmarkId}`;
        default:
            return `/${subSystem}/${appKey}?bookmarkId=${bookmarkId}`;
    }
};

export const BookmarkEntry = ({
    appKey,
    bookmark,
    subSystem,
    isOldApplication,
}: BookmarkEntryProps) => {
    return (
        <>
            <BookmarkLink
                to={getBookmarkRedirect(appKey, bookmark.id, subSystem, isOldApplication)}
                title={bookmark?.description}
            >
                {bookmark.name}
            </BookmarkLink>
            <Icons>
                <MenuOptions bookmark={bookmark} />
                {bookmark.isShared && (
                    <ClickableIcon
                        name="share"
                        title="Shared"
                        onClick={() => {
                            navigator.clipboard.writeText(createBookmarkURL(bookmark));
                        }}
                        color={tokens.colors.interactive.primary__resting.hsla}
                    />
                )}
            </Icons>
        </>
    );
};
