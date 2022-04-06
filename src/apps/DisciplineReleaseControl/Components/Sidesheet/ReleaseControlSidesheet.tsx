import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ServerError } from '../../Api/Types/ServerError';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ReleaseControlErrorBanner } from './ErrorBanner';
import { Pipetest } from '../../Types/pipetest';
import { Viewer } from '../../../../packages/ModelViewer/ModelViewer';
import { useFacility } from '@equinor/portal-client';
import { Tabs } from '@equinor/eds-core-react';
import { CheckListTable } from './CheckListTable';
import { BoxInsulationTable } from './BoxInsulationTable';
import { SidesheetApi } from '../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { SidesheetTabList } from './SidesheetTabs';

interface ReleaseControlSidesheetProps {
    item: Pipetest;
    actions: SidesheetApi;
}

export const ReleaseControlSidesheet = ({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element => {
    const [errorMessage] = useState<ServerError | undefined>();

    const { echoPlantId } = useFacility();
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    const width = window.innerWidth / 2;

    useEffect(() => {
        actions.setWidth(width);
    }, [width]);

    useEffect(() => {
        actions.setTitle(<>Pipetest {item.name}</>);
    }, [item.name]);

    return (
        <Wrapper>
            <ReleaseControlErrorBanner message={errorMessage} />
            <ReleaseControlSidesheetBanner pipetest={item} />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <Tabs.Tab>Single line diagram </Tabs.Tab>
                    <Tabs.Tab>Details</Tabs.Tab>
                    <Tabs.Tab>3D-visualisation</Tabs.Tab>
                </SidesheetTabList>
                <TabList>
                    <Tabs.Panel>
                        <>Single line diagram</>
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <h4>{item.description}</h4>
                        <CheckListTable checkLists={item.checkLists} />
                        <br />
                        <BoxInsulationTable insulationBoxes={item.insulationBoxes} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        {activeTab === 2 && (
                            <ThreeDModel>
                                <Viewer
                                    echoPlantId={echoPlantId}
                                    padding={1}
                                    tags={['56L00420A', '56L00420B', '56L00440A', '56L00446A']}
                                />
                            </ThreeDModel>
                        )}
                    </Tabs.Panel>
                </TabList>
            </Tabs>
        </Wrapper>
    );
};

const ThreeDModel = styled.div`
    height: 100vh;
`;

const TabList = styled(Tabs.Panels)`
    padding: 12px 16px;
`;
