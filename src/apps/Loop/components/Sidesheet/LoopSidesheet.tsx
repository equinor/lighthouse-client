import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loop } from '../../types';
import { LoopMCCR } from '../../utility/config';
import { Banner } from './Banner';
import { BannerItem } from './BannerItem';

type LoopSidesheetProps = {
    item: Loop;
    actions: SidesheetApi;
};
export const LoopSidesheet = ({ item, actions }: LoopSidesheetProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    useEffect(() => {
        actions.setTitle(`${item.tagNo}, ${item.checklistId}`);
    }, []);
    console.log('item', item);
    return (
        <div>
            <Banner padding="0 0.5em">
                <BannerItem title="MC Status" value={item.loopContentStatus || 'N/A'}></BannerItem>
                <BannerItem title="Cmpkg" value={item.commissioningPackageNo || 'N/A'} />
                <BannerItem title="Mcpkg" value={item.mechanicalCompletionPackageNo || 'N/A'} />
                <BannerItem title="Milestone" value={item.priority1 || 'N/A'} />
            </Banner>
            <div>
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <SidesheetTabList>
                        <Tabs.Tab>Overview</Tabs.Tab>
                        <Tabs.Tab>Work orders</Tabs.Tab>
                        <Tabs.Tab>Checklists</Tabs.Tab>
                        <Tabs.Tab>3D</Tabs.Tab>
                    </SidesheetTabList>
                    <Tabs.Panels style={{ padding: '1em' }}>
                        <Tabs.Panel>
                            <h2>Details</h2>
                            <div>
                                <p>Loop: {item.tagNo}</p>
                                <p>Cmpkg: {item.commissioningPackageNo}</p>
                                <p>Mcpkg: {item.mechanicalCompletionPackageNo}</p>
                            </div>

                            <h2>Content</h2>
                        </Tabs.Panel>
                        <Tabs.Panel>Work order</Tabs.Panel>
                        <Tabs.Panel>Checklists</Tabs.Panel>
                        <Tabs.Panel>3D</Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </div>
        </div>
    );
};
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
