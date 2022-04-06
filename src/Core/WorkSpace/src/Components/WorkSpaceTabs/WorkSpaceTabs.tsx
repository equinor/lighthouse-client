import { Button, CircularProgress, Dialog, Typography } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router';
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
                                    buttons={[
                                        <Button key={1} onClick={() => navigate('/')}>
                                            Go to homepage
                                        </Button>,
                                    ]}
                                    text={
                                        typeof dataApi.error === 'string'
                                            ? dataApi.error
                                            : 'Something went wrong'
                                    }
                                />
                            </WorkspaceErrorPage>
                        ) : (!dataApi?.isFetching || dataApi.isFetching) &&
                            dataApi?.data?.length === 0 ? (
                            <Loading>
                                <CircularProgress color="primary" value={0} size={48} />
                                <h2>Loading {title.toLowerCase()}..</h2>
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
    buttons: React.ReactElement[];
}

export function DumpsterFireDialog({
    text,
    title = 'Ooops, this is embarassing..',
    buttons,
}: DumpsterFireDialogProps): JSX.Element {
    return (
        <Dialog style={{ width: '600px' }}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.CustomContent>
                <Typography variant="body_short">{text}</Typography>
            </Dialog.CustomContent>
            <Dialog.Actions>
                <>
                    {buttons.map((comp, i) => {
                        const Component = () => comp;
                        return <Component key={i} />;
                    })}
                </>
            </Dialog.Actions>
        </Dialog>
    );
}
