import { Tabs } from '@equinor/eds-core-react';
import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AssignmentsTab } from '../../Core/Assignments/Components/AssignmentsTab';
import { NotificationsTab } from './NotificationsTab';

interface ActionCenterSidesheetProps {
    actions: SidesheetApi;
}

export function ActionCenterSidesheet({
    actions: { setTitle, closeSidesheet },
}: ActionCenterSidesheetProps): JSX.Element {
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        activeTab === 0 ? setTitle('Notifications') : setTitle('Tasks');
    }, [activeTab]);

    const handleChange = (index: number) => setActiveTab(index);

    return (
        <>
            <Wrapper>
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <TabsList>
                        <Tabs.Tab>Notifications </Tabs.Tab>
                        <Tabs.Tab>Tasks </Tabs.Tab>
                    </TabsList>
                    <Tabs.Panels>
                        <Tabs.Panel>
                            <NotificationsTab onClickNotification={closeSidesheet} />
                        </Tabs.Panel>
                        <Tabs.Panel>
                            <AssignmentsTab />
                        </Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </Wrapper>
        </>
    );
}

export const actionCenterSidesheetWidgetManifest: WidgetManifest = {
    widgetId: 'actionCenter',
    widgetType: 'sidesheet',
};

export const actionCenterSidesheetWidgetComponent: ComponentManifest = {
    widgetId: 'actionCenter',
    widgetType: 'sidesheet',
    widget: ActionCenterSidesheet,
};

const TabsList = styled(Tabs.List)`
    grid-template-columns: 1fr 1fr;
`;

const Wrapper = styled.div`
    background-color: white;
    width: auto;
    height: 200px;
    min-height: 800px;
    height: 100%;
    overflow: scroll;
`;
