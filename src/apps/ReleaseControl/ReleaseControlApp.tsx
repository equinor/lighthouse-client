import { useEffect } from 'react';
import styled from 'styled-components';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClientApi } from '@equinor/lighthouse-portal-client';

import { useEdsTabs } from '../../hooks/edsTabs/useEdsTabs';
import { SidesheetApi } from '../../packages/Sidesheet/Types/SidesheetApi';
import { BannerItem } from '../DisciplineReleaseControl/Components/Sidesheet/ReleaseControlSidesheetBanner';
import { Banner } from '../ScopeChangeRequest/Components/Sidesheet/SidesheetBanner/SidesheetBanner';
import { ReleaseControl } from './types/releaseControl';
import { filterOptions, tableConfig, dataSource, idResolver } from './workspaceConfig';
import { createAtom } from '@equinor/atom';
import { releaseControlQueries } from './queries/queries';
import { useQuery } from 'react-query';
import { Workflow } from './components/Workflow/Workflow';
import { getReleaseControlSnapshot } from './hooks/useReleaseControlContext';
import { releaseControlContext } from './Atoms/releaseControlAtom';
import { useReleaseControlMutationWatcher } from './hooks/useReleaseControlMutationWatcher';

export function setup({ createWorkSpace }: ClientApi): void {
    createWorkSpace<ReleaseControl>({
        objectIdentifier: 'id',
        CustomSidesheet: ReleaseControlSidesheet,
    })
        .registerDataSource(dataSource)
        .registerTableOptions(tableConfig)
        .registerFilterOptions(filterOptions)
        .registerIdResolver(idResolver);
    // .registerPowerBIOptions({
    //     pages: [
    //         {
    //             pageId: 'ReportSectionb822b2eb4fc97aef255b',
    //             pageTitle: 'Overview',
    //             default: true,
    //         },
    //         {
    //             pageId: 'ReportSection40a8a70e6f82243888ca',
    //             pageTitle: 'History',
    //         },
    //     ],
    //     reportURI: 'pp-scope-change-analytics',
    // });
}

interface ReleaseControlSidesheetProps {
    item: ReleaseControl;
    actions: SidesheetApi;
}

const ReleaseControlSidesheet = ({ actions, item }: ReleaseControlSidesheetProps) => {
    const { baseQuery } = releaseControlQueries;

    useEffect(() => {
        const { updateAtom } = releaseControlContext;
        updateAtom({ releaseControl: item });
    }, [item.id]);

    useReleaseControlMutationWatcher(item.id);

    useQuery({
        ...baseQuery(item.id),
        initialData: item,
        onSuccess: (releaseControl) => {
            const { updateAtom } = releaseControlContext;
            updateAtom({ releaseControl });
        },
    });

    useEffect(() => {
        actions.setTitle(`${item.sequenceNumber} ${item.title}`);
    }, []);

    const { activeTab, handleChange } = useEdsTabs();

    if (Object.keys(getReleaseControlSnapshot().releaseControl).length < 2) {
        return <></>;
    }

    return (
        <div>
            <Banner>
                <BannerItem title="" />
                <BannerItem title={'Phase'} value={item.phase} />
                <BannerItem title={'Status'} value={item.workflowStatus} />
                <BannerItem title={'State'} value={item.isVoided ? 'Voided' : item.state} />
            </Banner>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <HeaderTab>
                        <div>Workflow</div>
                    </HeaderTab>
                </SidesheetTabList>
                <TabList>
                    <Tab>
                        <div>
                            <Workflow />
                        </div>
                    </Tab>
                </TabList>
            </Tabs>
        </div>
    );
};

const HeaderTab = styled(Tabs.Tab)``;
export const relaseControlSidesheetContext = createAtom({});
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;
