import { tokens } from '@equinor/eds-tokens';
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

const AppNameHeader = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`;
type AppBookmarkProps = {
  appKey: string;
  appBookmarks: BookmarkResponse[];
  isOld: boolean;
};
export const AppBookmarks = ({ appBookmarks, appKey, isOld }: AppBookmarkProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { apps } = useRegistry();
  const app = apps.find((app) => {
    if (!isOld) {
      return app.shortName === appKey + '-new';
    } else {
      return app.shortName === appKey.replace('jc-', '');
    }
  });

  return (
    <AppBookmarksContainer>
      <Header>
        <div>
          <ClickableIcon
            name={isOpen ? 'chevron_down' : 'chevron_right'}
            onClick={() => setIsOpen((s) => !s)}
            color={tokens.colors.interactive.primary__resting.hsla}
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
                  isOldApplication={
                    bookmark.appKey.includes('jc') && bookmark.appKey !== 'jca-job-analytics'
                  }
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
