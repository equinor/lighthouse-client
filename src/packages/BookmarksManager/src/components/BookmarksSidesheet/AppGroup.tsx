import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState } from 'react';
import styled from 'styled-components';
import { BookmarkResponse } from '../../types';
import { AppBookmarks } from './AppBookmarks';
import { AppBookmarksWrapper, Header } from './BookmarksSidesheet.styles';

const AppGroupHeader = styled.div`
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
`;
type AppGroupProps = {
    appGroupName: string;
    appGroupBookmarks: Record<string, BookmarkResponse[]>;
    isOld: boolean;
};
export const AppGroup = ({ appGroupBookmarks, appGroupName, isOld }: AppGroupProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div>
            <Header>
                <ClickableIcon
                    name={isOpen ? 'chevron_down' : 'chevron_right'}
                    onClick={() => setIsOpen((s) => !s)}
                    color={tokens.colors.interactive.primary__resting.hsla}
                />
                <AppGroupHeader>{appGroupName}</AppGroupHeader>
            </Header>

            {isOpen && (
                <AppBookmarksWrapper>
                    {Object.keys(appGroupBookmarks).map((appKey) => {
                        return (
                            <AppBookmarks
                                isOld={isOld}
                                key={appKey}
                                appBookmarks={appGroupBookmarks[appKey]}
                                appKey={appKey}
                            />
                        );
                    })}
                </AppBookmarksWrapper>
            )}
        </div>
    );
};
