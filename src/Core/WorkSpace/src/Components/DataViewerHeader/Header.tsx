import { oldApps } from '../../../../../apps/apps';
import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { ActionBar, HeaderWrapper, Title, TitleBar } from './HeaderStyles';
import { PowerBiHeader } from './PowerBiHeader';
import { WorkspaceHeader } from './WorkspaceHeader';
import { useEffect } from 'react';
import { spawnConfirmationDialog } from '../../../../ConfirmationDialog/Functions/spawnConfirmationDialog';

interface CompletionViewHeaderProps {
    shortName: string;
    groupe: string;
    tabs: TabsConfigItem[];
    title: string;
    sideSheetWidth: number;
}

export const ANALYTICS = 'analytics';

export const CompletionViewHeader = ({
    shortName,
    tabs,
    groupe,
    title,
    sideSheetWidth,
}: CompletionViewHeaderProps): JSX.Element => {
    const { activeTab } = useLocationContext();

    const isOldApp = !!oldApps.find((s) => s.shortName === shortName);

    useEffect(() => {
        if (isOldApp) {
            spawnConfirmationDialog(
                `Looks like you're using an old version of this app, press Ok to go to the new one`,
                'New version of app available',
                () => {
                    window.location.href = makeRedirectUrl(shortName);
                }
            );
        }
    }, [isOldApp]);

    return (
        <HeaderWrapper sideSheetWidth={sideSheetWidth}>
            <TitleBar>
                <Title variant="h3">{title}</Title>
                {!!oldApps.find((s) => s.shortName === shortName) && (
                    <>
                        <div style={{ color: 'red', fontSize: '18px', marginLeft: '16px' }}>
                            This app is being replaced with a new one and will stop recieving
                            updates
                        </div>
                        <a
                            style={{ fontSize: '18px', marginLeft: '16px' }}
                            href={makeRedirectUrl(shortName)}
                        >
                            Click here to try the new one
                        </a>
                    </>
                )}
            </TitleBar>

            <ActionBar>
                {activeTab === ANALYTICS ? (
                    <PowerBiHeader tabs={tabs} group={groupe} shortName={shortName} />
                ) : (
                    <WorkspaceHeader tabs={tabs} group={groupe} shortName={shortName} />
                )}
            </ActionBar>
        </HeaderWrapper>
    );
};

const makeRedirectUrl = (shortName: string) =>
    window.location.href.split(shortName)[0].concat(`${shortName}-new`).toString();
