import { FilterView } from '@equinor/filter';
import { useState } from 'react';
import { WorkspaceProps } from '../..';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { CompletionViewHeader } from '../DataViewerHeader/Header';

type HeaderWrapperProps = {
    props: WorkspaceProps;
    tabs: TabsConfigItem[];
};
export const HeaderWrapper = ({ tabs, props }: HeaderWrapperProps) => {
    const [activeFilter, setActiveFilter] = useState<boolean>(false);
    function handleFilter() {
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
