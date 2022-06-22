import { useMemo } from 'react';

import { useDataContext } from '../../Context/DataProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { Presets } from '../Presets/Presets';
import { CreatorButton } from './CreatorButton/CreatorButton';
import { LeftSection, FillSection, RightSection } from './HeaderStyles';
import { HeaderTabButtons } from './HeaderTabButtons/HeaderTabButtons';
import { RefreshButton } from './RefreshButton/RefreshButton';
import { StatusBar } from '@equinor/lighthouse-status-bar';
import { useFilterApiContext } from '@equinor/filter';
import { BookmarkDropdown } from '@equinor/BookmarksManager';
import { ViewSettings } from './ViewSettings/ViewSettings';

interface WorkspaceHeaderProps {
    tabs: TabsConfigItem[];
    group: string;
    shortName: string;
}

export const WorkspaceHeader = ({ tabs, group, shortName }: WorkspaceHeaderProps): JSX.Element => {
    const {
        filterState: { getFilteredData },
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

                <BookmarkDropdown appKey={shortName} subSystem={group} />
                <ViewSettings tabs={tabs} />
            </RightSection>
        </>
    );
};
