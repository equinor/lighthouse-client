import { Tabs } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidesheetApi } from '../../packages/Sidesheet/Components/ResizableSidesheet';
import { AssignmentsTab } from './AssignmentsTab';
import { NotificationsTab } from './NotificationsTab';

interface ActionCenterSidesheetProps {
    actions: SidesheetApi;
}

export function ActionCenterSidesheet({
    actions: { setTitle },
}: ActionCenterSidesheetProps): JSX.Element {
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        activeTab === 0 ? setTitle(<>Notifications</>) : setTitle(<>Assignments</>);
    }, [activeTab]);

    const handleChange = (index: number) => setActiveTab(index);

    return (
        <>
            <Wrapper>
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <TabsList>
                        <Tabs.Tab>Notifications </Tabs.Tab>
                        <Tabs.Tab disabled>Assignments </Tabs.Tab>
                    </TabsList>
                    <Tabs.Panels>
                        <Tabs.Panel>
                            <NotificationsTab />
                        </Tabs.Panel>
                        <Tabs.Panel>{activeTab === 1 && <AssignmentsTab />}</Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </Wrapper>
        </>
    );
}

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
