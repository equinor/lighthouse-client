import { oldApps } from '../../../../../apps/apps';
import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { ActionBar, HeaderWrapper, Title, TitleBar } from './HeaderStyles';
import { PowerBiHeader } from './PowerBiHeader';
import { WorkspaceHeader } from './WorkspaceHeader';
import { useEffect } from 'react';
import { spawnConfirmationDialog } from '../../../../ConfirmationDialog/Functions/spawnConfirmationDialog';
import { useClientContext } from '../../../../Client/Hooks';
import { httpClient } from '../../../../Client/Functions';
import { useQuery } from 'react-query';

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
                            This app is being replaced with a new one and will stop recieving
                            updates
                        </div>
                        <a href={makeRedirectUrl(shortName)}>Click here to try the new one</a>
                        <div>
                            Any questions regarding this change, please contact <ContactPerson />
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

const makeRedirectUrl = (shortName: string) =>
    window.location.href.split(shortName)[0].concat(`${shortName}-new`).toString();

export function ContactPerson() {
    const { settings } = useClientContext();

    const { fusionPeople } = httpClient();

    const { isLoading, data, error } = useQuery<Person>(
        ['contactperson', settings.contactPerson],
        async () => {
            const res = await fusionPeople.fetch('persons/ensure?api-version=3.0', {
                method: 'POST',
                body: JSON.stringify({ personIdentifiers: [settings.contactPerson] }),
            });

            const data = await res.json();

            return data[0].person;
        }
    );

    if (isLoading) {
        <div>Loading contact person...</div>;
    }

    if (error) {
        return <div>Failed to load contact person</div>;
    }

    return (
        <>
            <a target="_blank" href={`https://teams.microsoft.com/l/chat/0/0?users=${data?.mail}`}>
                {data?.name}
            </a>
        </>
    );
}

interface Person {
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
