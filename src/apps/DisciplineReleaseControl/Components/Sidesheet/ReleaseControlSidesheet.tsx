import { Tabs } from '@equinor/eds-core-react';
import { useLocationKey } from '@equinor/hooks';
import { ModelViewerContextProvider } from '@equinor/lighthouse-model-viewer';
import { SidesheetApi } from '@equinor/sidesheet';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { ServerError } from '../../Api/Types/ServerError';
import {
    fetchAndChewPipetestDataFromApi,
    sortCheckListsForTable,
} from '../../utils/helpers/statusHelpers';
import { SidesheetWrapper, Wrapper, WrapperFillerDiv } from '../../Styles/SidesheetWrapper';
import { HTSidesheet, Pipetest } from '../../Types/pipetest';
import { Panel, ThreeDView } from '../3D';
import { CheckListTable } from './CheckListTable';
import { ReleaseControlErrorBanner } from './ErrorBanner';
import { InsulationTable } from './InsulationTable';
import { ReleaseControlHTSidesheet } from './ReleaseControlHTSidesheet';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { SidesheetTabList, Tab, TabList } from './sidesheetStyles';
import { WarningBanner, WarningBannerText } from './sidesheetStyles';
import { useSidesheetEffects } from './useSidesheetEffects';
import { WorkOrderTab } from './WorkOrderTab';
import { CircuitDiagram } from '@equinor/CircuitDiagram';
import { useWorkSpace } from '@equinor/WorkSpace';

interface GatewaySidesheetProps {
    item: Pipetest | HTSidesheet;
    actions: SidesheetApi;
}

export const GatewaySidesheet = (props: GatewaySidesheetProps) => {
    return (
        <SidesheetWrapper>
            {'items' in props.item ? (
                <ReleaseControlHTSidesheet item={props.item} actions={props.actions} />
            ) : (
                <ReleaseControlSidesheet item={props.item} actions={props.actions} />
            )}
        </SidesheetWrapper>
    );
};

interface ReleaseControlSidesheetProps {
    item: Pipetest;
    actions: SidesheetApi;
}

export function ReleaseControlSidesheet({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element {
    const [errorMessage] = useState<ServerError | undefined>();

    const [activeTab, setActiveTab] = useState<number>(0);

    const width = window.innerWidth / 2;

    useSidesheetEffects(actions, item);

    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    const locationKey = useLocationKey();

    //Fetches all pipetests data from location cache. If no cache it fetches and chews the data itself.
    const { data } = useQuery(locationKey, () => fetchAndChewPipetestDataFromApi(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const missingInsulationCheckListsCount = item.insulationBoxes.filter(
        (x) => x.procosysStatus === null
    )?.length;

    const { onGroupeSelect, onSelect } = useWorkSpace();

    return (
        <>
            <ReleaseControlErrorBanner message={errorMessage} />
            <ReleaseControlSidesheetBanner pipetest={item} />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <Tabs.Tab>Circuit diagram</Tabs.Tab>
                    <Tabs.Tab>Work orders</Tabs.Tab>
                    <Tabs.Tab>Insulation</Tabs.Tab>
                    <Tabs.Tab>Checklists</Tabs.Tab>
                    <Tabs.Tab>3D</Tabs.Tab>
                </SidesheetTabList>
                <TabList>
                    <Tab>
                        <CircuitDiagram
                            pipetest={item}
                            pipetests={data !== undefined ? data : []}
                            width={width}
                            circuitAndStarterTagNos={item?.circuits?.map(
                                (c) => c.circuitAndStarterTagNo
                            )}
                            onGroupeSelect={onGroupeSelect}
                            onSelect={onSelect}
                        />
                    </Tab>
                    <Tab>
                        <WorkOrderTab id={item.name} />
                    </Tab>
                    <Tab>
                        <Wrapper>
                            {missingInsulationCheckListsCount !== 0 &&
                                (missingInsulationCheckListsCount === 1 ? (
                                    <WarningBanner>
                                        <WarningBannerText>
                                            Warning: {missingInsulationCheckListsCount} insulation
                                            box missing checklists in ProCoSys.
                                        </WarningBannerText>
                                    </WarningBanner>
                                ) : (
                                    <WarningBanner>
                                        <WarningBannerText>
                                            Warning: {missingInsulationCheckListsCount} insulation
                                            boxes missing checklists in ProCoSys.
                                        </WarningBannerText>
                                    </WarningBanner>
                                ))}
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
                            <WrapperFillerDiv />
                        </Wrapper>
                    </Tab>
                    <Tab>
                        <CheckListTable checkLists={sortCheckListsForTable(item.checkLists)} />
                    </Tab>
                    <>
                        <Panel>
                            {activeTab === 4 && (
                                <ModelViewerContextProvider>
                                    <ThreeDView pipetest={item} />
                                </ModelViewerContextProvider>
                            )}
                        </Panel>
                    </>
                </TabList>
            </Tabs>
        </>
    );
}
