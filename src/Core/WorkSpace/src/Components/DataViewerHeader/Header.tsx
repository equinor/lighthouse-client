import { oldApps } from '../../../../../apps/apps';
import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { ActionBar, HeaderWrapper, Title, TitleBar } from './HeaderStyles';
import { PowerBiHeader } from './PowerBiHeader';
import { WorkspaceHeader } from './WorkspaceHeader';
import { useEffect } from 'react';
import { spawnConfirmationDialog } from '../../../../ConfirmationDialog/Functions/spawnConfirmationDialog';
import { CircularProgress } from '@equinor/eds-core-react';
import { useContactPerson } from '../../../../../hooks/useContactPerson';

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
                    <span style={{ marginLeft: '16px', fontSize: '18px' }}>
                        <div style={{ color: 'red' }}>
                            This app is being replaced with a new app and will stop recieving
                            updates
                        </div>
                        <a href={makeRedirectUrl(shortName)}>Click here to try the new app</a>
                        <div>
                            Any questions regarding this change, please contact the Fusion Digital
                            Coach: <ContactPerson />
                        </div>
                    </span>
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

const makeRedirectUrl = (shortName: string) => {
    if (shortName === 'handover') {
        return window.location.href.split(shortName)[0].concat(`${shortName}-new`).toString();
    }
    if (shortName === 'mc') {
        return window.location.href.split(shortName)[0].concat(`mechanical-completion`).toString();
    }
    if (shortName === 'loop') {
        return window.location.href.split(shortName)[0].concat(`loop-new`).toString();
    }
    return '';
};

export function ContactPerson() {
    const { isLoading, data, error } = useContactPerson();

    if (isLoading) {
        return <CircularProgress size={16} />;
    }

    if (error) {
        return <div>Failed to load contact person</div>;
    }

    return (
        <>
            <a target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${data?.mail}`}>
                {data?.name} (Site 2, 3. Floor,Open plan)
            </a>
        </>
    );
}

export interface FusionPerson {
    fusionPersonId: string;
    azureUniqueId: string;
    mail: string;
    name: string;
    jobTitle: string;
    department: string;
    fullDepartment: string;
    mobilePhone: string;
    officeLocation?: any;
    sapId: string;
    employeeId: string;
    isResourceOwner: boolean;
    upn: string;
    accountType: string;
    accountClassification: string;
    managerAzureUniqueId: string;
    preferredContactMail?: any;
}
