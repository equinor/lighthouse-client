import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ServerError } from '../../Api/Types/ServerError';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ReleaseControlErrorBanner } from './ErrorBanner';
import { Pipetest } from '../../Types/pipetest';
// import { Viewer } from '../../../../packages/ModelViewer/ModelViewer';
// import { useFacility } from '@equinor/portal-client';
import { Tabs } from '@equinor/eds-core-react';
import { CheckListTable } from './CheckListTable';
import { BoxInsulationTable } from './BoxInsulationTable';
import { SidesheetApi } from '../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { SidesheetTabList } from './SidesheetTabs';
import { ElectroView } from '../Electro/ElectroView';
import { useQuery } from 'react-query';
import { useLocationKey } from '../../../../packages/Filter/Hooks/useLocationKey';
import { fetchAndChewPipetestDataFromApi } from '../../Functions/statusHelpers';

interface ReleaseControlSidesheetProps {
    item: Pipetest;
    actions: SidesheetApi;
}

export const ReleaseControlSidesheet = ({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element => {
    const [errorMessage] = useState<ServerError | undefined>();

    // const { echoPlantId } = useFacility();
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

    const locationKey = useLocationKey();

    //Fetches all pipetests date from location cache. If no cache it fetches and chews the data itself.
    const { data } = useQuery(locationKey, () => fetchAndChewPipetestDataFromApi(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return (
        <Wrapper>
            <ReleaseControlErrorBanner message={errorMessage} />
            <ReleaseControlSidesheetBanner pipetest={item} />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <Tabs.Tab>Single line diagram </Tabs.Tab>
                    <Tabs.Tab>Details</Tabs.Tab>
                    {/* <Tabs.Tab>3D-visualisation</Tabs.Tab> */}
                </SidesheetTabList>
                <Tabs.Panels>
                    <Tabs.Panel>
                        <ElectroView
                            pipetest={item}
                            pipetests={data !== undefined ? data : []}
                            width={width}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <TablesTab>
                            <h4>{item.description}</h4>
                            <CheckListTable checkLists={item.checkLists} />
                            <br />
                            <BoxInsulationTable insulationBoxes={item.insulationBoxes} />
                        </TablesTab>
                    </Tabs.Panel>
                    {/* <Tabs.Panel>
                        {activeTab === 2 && (
                            <ThreeDModel>
                                <Viewer
                                    echoPlantId={echoPlantId}
                                    padding={1}
                                    tags={['56L00420A', '56L00420B', '56L00440A', '56L00446A']}
                                />
                            </ThreeDModel>
                        )}
                    </Tabs.Panel> */}
                </Tabs.Panels>
            </Tabs>
        </Wrapper>
    );
};

// const ThreeDModel = styled.div`
//     height: 100vh;
// `;

const TablesTab = styled.div`
    padding-left: 8px;
`;
