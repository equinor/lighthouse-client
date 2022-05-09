import { FilterGroup, useFilterApiContext } from '@equinor/filter';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { WorkspaceTab } from '../WorkSpaceApi/workspaceState';
import { useLocationContext } from './LocationProvider';
type BookmarkState = {
    filter: FilterGroup[];
    activeTab: WorkspaceTab;
    garden: { gardenGroupByKeys: string | string[] };
};
type Context = BookmarkState & {
    persistGardenGroupByKeys: (groupByKeys: string | string[]) => void;
};

const BookmarkContext = createContext({} as Context);
type BookmarkContextWrapperProps = {};
export const BookmarkContextWrapper = ({
    children,
}: PropsWithChildren<BookmarkContextWrapperProps>): JSX.Element => {
    const [bookmarkState, setBookmarkState] = useState<BookmarkState>({
        filter: [],
        activeTab: 'garden',
        garden: { gardenGroupByKeys: [] },
    });
    const {
        filterState: { getFilterState },
    } = useFilterApiContext();

    const { activeTab } = useLocationContext();

    const persistGardenGroupByKeys = (groupByKeys: string | string[]) => {
        setBookmarkState((s) => ({
            ...s,
            garden: {
                gardenGroupByKeys: groupByKeys,
            },
        }));
    };

    useEffect(() => {
        setBookmarkState((s) => ({ ...s, filter: getFilterState() }));
    }, [getFilterState]);

    useEffect(() => {
        setBookmarkState((s) => ({ ...s, activeTab: activeTab }));
    }, [activeTab]);

    return (
        <BookmarkContext.Provider value={{ ...bookmarkState, persistGardenGroupByKeys }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarkContext = () => {
    return useContext(BookmarkContext);
};
