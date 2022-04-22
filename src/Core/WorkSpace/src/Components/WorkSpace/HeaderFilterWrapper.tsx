import { FilterView, useFilterApiContext } from '@equinor/filter';
import { useState } from 'react';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { WorkspaceProps } from '../../WorkSpace';
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
