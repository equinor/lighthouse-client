import { useMemo } from 'react';
import { Icon } from '@equinor/eds-core-react';

import { useDataContext } from '../../Context/DataProvider';
import { useViewerContext } from '../../Context/ViewProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { Presets } from '../Presets/Presets';
import { SearchButton } from '../Search/Search';
import { TabButton } from '../ToggleButton';
import { CreatorButton } from './CreatorButton/CreatorButton';
import { LeftSection, FillSection, RightSection } from './HeaderStyles';
import { HeaderTabButtons } from './HeaderTabButtons/HeaderTabButtons';
import { RefreshButton } from './RefreshButton/RefreshButton';
import { StatusBar } from '@equinor/lighthouse-status-bar';
import { useFilterApiContext } from '@equinor/filter';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import { BookmarkDropdown } from '@equinor/BookmarksManager';

interface WorkspaceHeaderProps {
    tabs: TabsConfigItem[];
    group: string;
    shortName: string;
}

export const WorkspaceHeader = ({ tabs, group, shortName }: WorkspaceHeaderProps): JSX.Element => {
    const { isFilterActive, toggleFilter } = useViewerContext();

    const {
        filterState: { getFilteredData, checkHasActiveFilters },
    } = useFilterApiContext();

    const data = getFilteredData();
    const { statusFunc, key } = useDataContext();
    const statusItems = useMemo(() => statusFunc && statusFunc(data), [data, statusFunc, key]);
    return (
        <>
            <LeftSection>
                <FillSection>
                    <StatusBar statusItems={statusItems} />
                </FillSection>
            </LeftSection>
            <RightSection>
                <Presets />
                <CreatorButton />

                <HeaderTabButtons tabs={tabs} />

                <SearchButton />
                <RefreshButton />
                <BookmarkDropdown appKey={shortName} subSystem={group} />

                <TabButton onClick={toggleFilter} aria-selected={isFilterActive} title="Filter">
                    {checkHasActiveFilters() ? <FilterFilled /> : <Icon name="filter_alt" />}
                </TabButton>
            </RightSection>
        </>
    );
};
