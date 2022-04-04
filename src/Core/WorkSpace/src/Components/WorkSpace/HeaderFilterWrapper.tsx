import { FilterView } from '@equinor/filter';
import { useState } from 'react';
import { WorkspaceProps } from '../..';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { CompletionViewHeader } from '../DataViewerHeader/Header';

type HeaderWrapperProps = {
    props: WorkspaceProps;
    tabs: TabsConfigItem[];
};
export const HeaderWrapper = ({ tabs, props }: HeaderWrapperProps): JSX.Element => {
    const [activeFilter, setActiveFilter] = useState<boolean>(false);

    const {
        filterState: { getAllFilterGroups },
    } = useFilterApiContext();

    function handleFilter() {
        if (getAllFilterGroups().length === 0) return;
        setActiveFilter((state) => !state);
    }
    return (
        <>
            <CompletionViewHeader
                {...props}
                tabs={tabs}
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            />
            <FilterView isActive={activeFilter} />
        </>
    );
};
