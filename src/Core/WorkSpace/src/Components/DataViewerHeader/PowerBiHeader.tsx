import { Icon, Divider } from '@equinor/eds-core-react';
import { FilterFilled } from '../../../../../components/Icon/FilterIconFilled';
import { BookmarkDropdown } from '../../../../../packages/BookmarksManager/src';
import { useViewerContext } from '../../Context/ViewProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { TabButton } from '../ToggleButton';
import { LeftSection, RightSection } from './HeaderStyles';
import { HeaderTabButtons } from './HeaderTabButtons/HeaderTabButtons';
import { PowerBiPages } from './PowerBIPages/PowerBIPages';

interface PowerBiHeaderProps {
    tabs: TabsConfigItem[];
    group: string;
    shortName: string;
}

export const PowerBiHeader = ({ tabs, group, shortName }: PowerBiHeaderProps): JSX.Element => {
    const { isFilterActive, hasActiveFilters, toggleFilter } = useViewerContext();
    return (
        <>
            <LeftSection>
                <PowerBiPages />
            </LeftSection>
            <RightSection>
                <HeaderTabButtons tabs={tabs} />
                <Divider />
                <BookmarkDropdown appKey={shortName} subSystem={group} />
                <TabButton
                    onClick={toggleFilter}
                    aria-selected={isFilterActive}
                    title="PowerBi Filter"
                >
                    {hasActiveFilters ? <FilterFilled /> : <Icon name={'filter_alt'} />}
                </TabButton>
            </RightSection>
        </>
    );
};
