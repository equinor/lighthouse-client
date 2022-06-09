import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState } from 'react';
import { BookmarkResponse } from '../../types';
import { AppBookmarks } from './AppBookmarks';
import { AppBookmarksWrapper, Header } from './BookmarksSidesheet.styles';

type AppGroupProps = {
    appGroupName: string;
    appGroupBookmarks: Record<string, BookmarkResponse[]>;
};
export const AppGroup = ({ appGroupBookmarks, appGroupName }: AppGroupProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div>
            <Header>
                <ClickableIcon
                    name={isOpen ? 'chevron_down' : 'chevron_right'}
                    onClick={() => setIsOpen((s) => !s)}
                    color="black"
                />
                <h3>{appGroupName}</h3>
            </Header>

            {isOpen && (
                <AppBookmarksWrapper>
                    {Object.keys(appGroupBookmarks).map((appKey) => {
                        return (
                            <AppBookmarks
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
