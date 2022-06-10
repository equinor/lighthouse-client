import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { BookmarkResponse } from '../../types';
import { BookmarkLink } from './BookmarksSidesheet.styles';
import { MenuOptions } from './MenuOptions';
const Icons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`;
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
            <Icons>
                <MenuOptions bookmark={bookmark} />
                {bookmark.isShared && (
                    <Icon
                        name="share"
                        title="Shared"
                        color={tokens.colors.interactive.primary__resting.hsla}
                    />
                )}
            </Icons>
        </>
    );
};
