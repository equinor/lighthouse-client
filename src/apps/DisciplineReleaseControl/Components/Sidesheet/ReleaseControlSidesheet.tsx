import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ServerError } from '../../Api/Types/ServerError';
import { fetchAndChewPipetestDataFromApi } from '../../Functions/statusHelpers';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ElectroView } from '../Electro/ElectroView';
import { HTSidesheet, Pipetest } from '../../Types/pipetest';
import { Tabs } from '@equinor/eds-core-react';
import { CheckListTable } from './CheckListTable';
import { ReleaseControlErrorBanner } from './ErrorBanner';
import { InsulationTable } from './InsulationTable';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { SidesheetTabList } from './SidesheetTabs';
import { TablesTab, WarningBanner, WarningBannerText } from './styles';
import { WorkOrderTab } from './WorkOrderTab';
import { ReleaseControlHTSidesheet } from './ReleaseControlHTSidesheet';
import { useLocationKey } from '@equinor/filter';

interface GatewaySidesheetProps {
    item: Pipetest | HTSidesheet;
    actions: SidesheetApi;
}

export const GatewaySidesheet = (props: GatewaySidesheetProps) => {
    return (
        <>
            {'items' in props.item ? (
                <ReleaseControlHTSidesheet item={props.item} actions={props.actions} />
            ) : (
                <ReleaseControlSidesheet item={props.item} actions={props.actions} />
            )}
        </>
    );
};

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
        actions.setTitle(`Pipetest ${item.name}`);
    }, [item.name]);

    const locationKey = useLocationKey();

    //Fetches all pipetests data from location cache. If no cache it fetches and chews the data itself.
    const { data } = useQuery(locationKey, () => fetchAndChewPipetestDataFromApi(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const missingInsulationCheckListsCount = item.insulationBoxes.filter(
        (x) => x.procosysStatus === null
    )?.length;

    return (
        <Wrapper>
            <ReleaseControlErrorBanner message={errorMessage} />
            <ReleaseControlSidesheetBanner pipetest={item} />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <Tabs.Tab>Circuit diagram</Tabs.Tab>
                    <Tabs.Tab>Work orders</Tabs.Tab>
                    <Tabs.Tab>Insulation</Tabs.Tab>
                    <Tabs.Tab>Checklists</Tabs.Tab>
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
                        <WorkOrderTab id={item.name} />
                    </Tabs.Panel>

                    <Tabs.Panel>
                        {missingInsulationCheckListsCount !== 0 &&
                            (missingInsulationCheckListsCount === 1 ? (
                                <WarningBanner>
                                    <WarningBannerText>
                                        ! Warning: {missingInsulationCheckListsCount} insulation box
                                        missing checklists in ProCoSys.
                                    </WarningBannerText>
                                </WarningBanner>
                            ) : (
                                <WarningBanner>
                                    <WarningBannerText>
                                        ! Warning: {missingInsulationCheckListsCount} insulation
                                        boxes missing checklists in ProCoSys.
                                    </WarningBannerText>
                                </WarningBanner>
                            ))}
                        <TablesTab>
                            <InsulationTable
                                insulations={item.pipeInsulationBoxes}
                                pipeInsulation={true}
                            />
                            <br />
                            <InsulationTable
                                insulations={item.insulationBoxes}
                                pipeInsulation={false}
                                pipetestName={item.name}
                            />
                        </TablesTab>
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <TablesTab>
                            <h4>{item.description}</h4>
                            <CheckListTable checkLists={item.checkLists} />
                        </TablesTab>
                    </Tabs.Panel>
                    {/* <Tabs.Panel>
                        {activeTab === 4 && (
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
