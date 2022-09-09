import { Tabs } from '@equinor/eds-core-react';
import { useLocationKey } from '@equinor/hooks';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ServerError } from '../../Api/Types/ServerError';
import { fetchAndChewPipetestDataFromApi } from '../../utils/helpers/statusHelpers';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { HTSidesheet } from '../../Types/pipetest';
import { ElectroView } from '../Electro/ElectroView';
import { CheckListTable } from './CheckListTable';
import { ReleaseControlErrorBanner } from './ErrorBanner';
import { SidesheetTabList } from './SidesheetTabs';
import { TablesTab } from './styles';

interface ReleaseControlHTSidesheetProps {
    item: HTSidesheet;
    actions: SidesheetApi;
}

export const ReleaseControlHTSidesheet = ({
    actions,
    item,
}: ReleaseControlHTSidesheetProps): JSX.Element => {
    const [errorMessage] = useState<ServerError | undefined>();

    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    const width = window.innerWidth / 2;

    useEffect(() => {
        actions.setWidth(width);
    }, [width]);

    useEffect(() => {
        actions.setTitle(<>{item.value}</>);
    }, [item.value]);

    const locationKey = useLocationKey();

    //Fetches all pipetests data from location cache. If no cache it fetches and chews the data itself.
    const { data } = useQuery(locationKey, () => fetchAndChewPipetestDataFromApi(), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return (
        <Wrapper>
            <ReleaseControlErrorBanner message={errorMessage} />
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <Tabs.Tab>Circuit diagram</Tabs.Tab>
                    <Tabs.Tab>Checklists</Tabs.Tab>
                </SidesheetTabList>
                <Tabs.Panels>
                    <Tabs.Panel>
                        <ElectroView
                            pipetest={item.items[0]}
                            pipetests={data !== undefined ? data : []}
                            width={width}
                            htCable={item.value}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <TablesTab>
                            <CheckListTable
                                checkLists={item.items[0]?.checkLists?.filter(
                                    (x) => x.tagNo === item.value
                                )}
                            />
                        </TablesTab>
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </Wrapper>
    );
};
