import { Button, CircularProgress, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useDataContext } from '../../Context/DataProvider';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { Panel, Panels } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
    activeTab: number;
    title: string;
}

export const WorkSpaceTabs = ({ tabs, activeTab, title }: CompletionViewTabsProps): JSX.Element => {
    const { dataApi } = useDataContext();

    return (
        <Panels>
            {tabs.map((tab, index) => {
                const ViewComponent = tab.viewComponent;
                return (
                    <Panel key={`panel-${tab.title}`}>
                        {dataApi?.isError ? (
                            <Loading>
                                <Icon
                                    color={tokens.colors.interactive.warning__resting.hex}
                                    size={40}
                                    name="error_outlined"
                                />
                                <span>
                                    <h2>API failed to respond</h2>
                                </span>
                                <Button variant="outlined" onClick={() => dataApi.refetch()}>
                                    Try again
                                </Button>
                            </Loading>
                        ) : dataApi?.isLoading ? (
                            <Loading>
                                <CircularProgress value={0} size={48} />
                                <h2>Loading {title.toLowerCase()}</h2>
                            </Loading>
                        ) : (
                            activeTab == index && <ViewComponent />
                        )}
                    </Panel>
                );
            })}
        </Panels>
    );
};

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    gap: 0.5em;
`;
