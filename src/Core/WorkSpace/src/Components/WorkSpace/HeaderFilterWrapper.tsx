import { FilterView } from '@equinor/filter';
import { useEffect, useState } from 'react';
import { WorkspaceProps } from '../..';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { CompletionViewHeader } from '../DataViewerHeader/Header';
import { useWorkSpaceKey } from '../DefaultView/Hooks/useWorkspaceKey';

type HeaderWrapperProps = {
    props: WorkspaceProps;
    tabs: TabsConfigItem[];
};
export const HeaderWrapper = ({ tabs, props }: HeaderWrapperProps) => {
    const [activeFilter, setActiveFilter] = useState<boolean>(false);
    function handleFilter() {
        setActiveFilter((state) => !state);
    }
    const key = useWorkSpaceKey();
    useEffect(() => {
        setActiveFilter(false);
    }, [key]);

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
