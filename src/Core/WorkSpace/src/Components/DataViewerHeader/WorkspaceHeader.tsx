import { useMemo, useRef, useState } from 'react';
import { Icon, Popover } from '@equinor/eds-core-react';

import { useDataContext } from '../../Context/DataProvider';
import { useViewerContext } from '../../Context/ViewProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { Presets } from '../Presets/Presets';
import { TabButton } from '../ToggleButton';
import { CreatorButton } from './CreatorButton/CreatorButton';
import { LeftSection, FillSection, RightSection } from './HeaderStyles';
import { HeaderTabButtons } from './HeaderTabButtons/HeaderTabButtons';
import { RefreshButton } from './RefreshButton/RefreshButton';
import { StatusBar } from '@equinor/lighthouse-status-bar';
import { useFilterApiContext } from '@equinor/filter';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import { BookmarkDropdown } from '@equinor/BookmarksManager';
import { useLocationContext } from '../../Context/LocationProvider';

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

                <RefreshButton />
                <BookmarkDropdown appKey={shortName} subSystem={group} />
                <ViewSettings tabs={tabs} />
                <TabButton onClick={toggleFilter} aria-selected={isFilterActive} title="Filter">
                    {checkHasActiveFilters() ? <FilterFilled /> : <Icon name="filter_alt" />}
                </TabButton>
            </RightSection>
        </>
    );
};

interface ViewSettingsProps {
    tabs: TabsConfigItem[];
}
const ViewSettings = ({ tabs }: ViewSettingsProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab } = useLocationContext();
    const ref = useRef<HTMLDivElement>(null);
    const ViewComp = tabs.find((s) => s.tabId === activeTab)?.viewSettings;

    if (!ViewComp) return null;

    return (
        <div ref={ref}>
            <TabButton aria-selected={isOpen} onClick={() => setIsOpen(true)}>
                <Icon name="settings" />
            </TabButton>
            {isOpen && (
                <Popover
                    open={isOpen}
                    anchorEl={ref.current}
                    placement="bottom"
                    onClose={() => setIsOpen(false)}
                >
                    {/* Decision, what styling should go where, strict or loose parent? */}
                    <div style={{ overflow: 'hidden' }}>
                        <ViewComp />
                    </div>
                </Popover>
            )}
        </div>
    );
};
