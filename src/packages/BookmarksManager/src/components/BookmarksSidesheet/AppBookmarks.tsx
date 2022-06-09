import { Icon } from '@equinor/eds-core-react';
import { useRegistry } from '@equinor/lighthouse-portal-client';
import { useState } from 'react';
import { BookmarkResponse } from '../../types';
import { BookmarkEntry } from './BookmarkEntry';
import {
    Header,
    AppBookmarksContainer,
    Bookmarks,
    BookmarkLinkWrapper,
} from './BookmarksSidesheet.styles';

type AppBookmarkProps = {
    appKey: string;
    appBookmarks: BookmarkResponse[];
};
export const AppBookmarks = ({ appBookmarks, appKey }: AppBookmarkProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { apps } = useRegistry();
    const app = apps.find((app) => app.shortName === appKey.replace('jc-', ''));

    return (
        <AppBookmarksContainer>
            <Header>
                <div>
                    <Icon
                        name={isOpen ? 'chevron_down' : 'chevron_right'}
                        onClick={() => setIsOpen((s) => !s)}
                    />
                </div>
                <h4>{app?.title ? app.title : appKey.replace('jc-', '')}</h4>
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
                                <BookmarkEntry
                                    appKey={appKey}
                                    subSystem={subSystem}
                                    bookmark={bookmark}
                                />
                            </BookmarkLinkWrapper>
                        );
                    })}
                </Bookmarks>
            )}
        </AppBookmarksContainer>
    );
};
