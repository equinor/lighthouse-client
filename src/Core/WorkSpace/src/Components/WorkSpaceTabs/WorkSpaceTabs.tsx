import { Button, CircularProgress, Dialog, Typography } from '@equinor/eds-core-react';
import { NavigateFunction, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useDataContext } from '../../Context/DataProvider';
import { TabsConfigItem } from '../../Tabs/tabsConfig';
import { WorkspaceErrorPage } from '../WorkSpace/WorkspaceErrorPage';
import { Panel, Panels } from './WorkSpaceTabsStyles';

interface CompletionViewTabsProps {
    tabs: TabsConfigItem[];
    activeTab: number;
    title: string;
}

export const WorkSpaceTabs = ({ tabs, activeTab, title }: CompletionViewTabsProps): JSX.Element => {
    const { dataApi } = useDataContext();
    const navigate = useNavigate();

    return (
        <Panels>
            {tabs.map((tab, index) => {
                const ViewComponent = tab.viewComponent;
                return (
                    <Panel key={`panel-${tab.title}`}>
                        {dataApi?.isError ? (
                            <WorkspaceErrorPage>
                                <DumpsterFireDialog
                                    navigateAction={navigate}
                                    text={dataApi.error as string}
                                />
                            </WorkspaceErrorPage>
                        ) : dataApi?.isLoading ? (
                            <Loading>
                                <CircularProgress color="primary" value={0} size={48} />
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

interface DumpsterFireDialogProps {
    title?: string;
    text: string;
    navigateAction: NavigateFunction;
}

export function DumpsterFireDialog({
    navigateAction,
    text,
    title = 'Ooops, this is embarassing..',
}: DumpsterFireDialogProps): JSX.Element {
    return (
        <Dialog style={{ width: '600px' }}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.CustomContent>
                <Typography variant="body_short">{text}</Typography>
            </Dialog.CustomContent>
            <Dialog.Actions>
                <Button onClick={() => navigateAction('/')}>Go to homepage</Button>
            </Dialog.Actions>
        </Dialog>
    );
}
