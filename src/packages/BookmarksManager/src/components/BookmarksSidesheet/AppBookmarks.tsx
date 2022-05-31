import { Icon } from '@equinor/eds-core-react';
import { useState } from 'react';
import { BookmarkResponse } from '../../types';
import {
    Header,
    AppBookmarksContainer,
    Bookmarks,
    BookmarkLink,
    BookmarkLinkWrapper,
} from './BookmarksSidesheet.styles';

type AppBookmarkProps = {
    appKey: string;
    appBookmarks: BookmarkResponse[];
};
export const AppBookmarks = ({ appBookmarks, appKey }: AppBookmarkProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <AppBookmarksContainer>
            <Header>
                <div>
                    <Icon
                        name={isOpen ? 'chevron_down' : 'chevron_right'}
                        onClick={() => setIsOpen((s) => !s)}
                    />
                </div>
                <h4>{appKey.replace('jc-', '')}</h4>
            </Header>
            {isOpen && (
                <Bookmarks>
                    {appBookmarks.map((bookmark) => {
                        const appKey = bookmark.appKey
                            .replace('jc-', '')
                            .replaceAll(' ', '-')
                            .toLocaleLowerCase();
                        const subSystem = bookmark.sourceSystem.subSystem.replace(' ', '');
                        return (
                            <BookmarkLinkWrapper key={bookmark.id}>
                                <BookmarkLink
                                    to={`/${subSystem}/${appKey}?bookmarkId=${bookmark.id}`}
                                >
                                    {bookmark.name}
                                </BookmarkLink>
                            </BookmarkLinkWrapper>
                        );
                    })}
                </Bookmarks>
            )}
        </AppBookmarksContainer>
    );
};
