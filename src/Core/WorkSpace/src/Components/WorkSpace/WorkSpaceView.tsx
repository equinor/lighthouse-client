import { useFilterApi } from '@equinor/filter';
import { openSidesheet, PopoutSidesheet } from '@equinor/sidesheet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WorkspaceProps } from '../..';
import { useSideSheet } from '../../../../../packages/Sidesheet/context/sidesheetContext';
import { useDataContext } from '../../Context/DataProvider';
import { useConfiguredTabs } from '../../Tabs/tabsConfig';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { Fallback } from '../FallbackSidesheet/Fallback';
import { NoDataView } from '../NoDataViewer/NoData';
import { WorkSpaceTabs } from '../WorkSpaceTabs/WorkSpaceTabs';
import { HeaderWrapper } from './HeaderFilterWrapper';
import { DataViewWrapper, Tabs, WorkspaceWrapper } from './WorkSpaceViewStyles';

export function WorkSpaceView(props: WorkspaceProps): JSX.Element {
    const {
        treeOptions,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        filterOptions = [],
        workflowEditorOptions,
        onSelect,
        idResolver,
        objectIdentifier,
        defaultTab,
    } = useWorkSpace();
    const { data, dataApi } = useDataContext();
    const { id } = useParams();
    const currentId = useMemo(() => id && `/${id}`, [id]);
    const navigate = useNavigate();
    const location = useLocation();

    const filterApi = useFilterApi({ filterConfiguration: filterOptions, data: data });

    const { tabs, viewIsActive } = useConfiguredTabs(
        //Dont know why??
        treeOptions as any,
        tableOptions,
        gardenOptions,
        timelineOptions,
        analyticsOptions,
        powerBiOptions,
        workflowEditorOptions
    );
    const [activeTab, setActiveTab] = useState(Number(id) || defaultTab);

    const handleChange = (index: number) => {
        setActiveTab(index);

        navigate(`${location.pathname.replace(currentId || '', '')}/${index}`, { replace: true });
    };

    const findItem = useCallback(
        (id: string): unknown | undefined => {
            return data.find((x) => x[objectIdentifier] === id);
        },
        [data, objectIdentifier]
    );

    const mountSidesheetFromUrl = useCallback(async () => {
        if (!onSelect) return;
        const id = location.hash.split('/')[1];
        if (data) {
            const item = findItem(id);
            if (item) {
                onSelect(item);
                return;
            }
        }
        if (idResolver) {
            const item = await idResolver(id);
            if (item) {
                onSelect(item);
                return;
            }
        } else {
            await dataApi.refetch();
            const item = findItem(id);
            if (item) {
                onSelect(item);
                return;
            }
        }
        openSidesheet(Fallback);
    }, [data, findItem, idResolver, location.hash, onSelect]);

    /**
     * Removes hash from url when closed
     */

    const { props: sidesheetProps, SidesheetComponent } = useSideSheet();
    useEffect(() => {
        if (location.hash.length > 0) return;
        if (!sidesheetProps && !SidesheetComponent) {
            navigate(location.pathname, { replace: true });
        }
    }, [sidesheetProps, SidesheetComponent, location.pathname]);

    /**
     * Store sidesheet state in url
     */
    useEffect(() => {
        if (sidesheetProps || SidesheetComponent) return;
        if (location.hash.length > 0 && onSelect) {
            mountSidesheetFromUrl();
        }
    }, [location.hash.length, mountSidesheetFromUrl, onSelect]);

    if (!viewIsActive) return <NoDataView />;
    return (
        <WorkspaceWrapper>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <HeaderWrapper props={props} tabs={tabs} />
                <DataViewWrapper>
                    <WorkSpaceTabs title={props.title} tabs={tabs} activeTab={activeTab} />
                </DataViewWrapper>
            </Tabs>
            <PopoutSidesheet />
        </WorkspaceWrapper>
    );
}
