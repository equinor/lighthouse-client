import { ClickableIcon } from '@equinor/lighthouse-components';
import { useRegistry } from '@equinor/lighthouse-portal-client';
import { useState } from 'react';
import styled from 'styled-components';
import { BookmarkResponse } from '../../types';
import { BookmarkEntry } from './BookmarkEntry';
import {
    Header,
    AppBookmarksContainer,
    Bookmarks,
    BookmarkLinkWrapper,
} from './BookmarksSidesheet.styles';
const AppNameHeader = styled.h4`
    margin: 0;
`;
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
                    <ClickableIcon
                        name={isOpen ? 'chevron_down' : 'chevron_right'}
                        onClick={() => setIsOpen((s) => !s)}
                        color="black"
                    />
                </div>
                <AppNameHeader>{app?.title ? app.title : appKey.replace('jc-', '')}</AppNameHeader>
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
