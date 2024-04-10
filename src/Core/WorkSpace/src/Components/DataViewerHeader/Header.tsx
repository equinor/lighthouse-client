import { oldApps } from '../../../../../apps/apps';
import { useLocationContext } from '../../Context/LocationProvider';
import { TabsConfigItem } from '../../Util/tabsConfig';
import { ActionBar, HeaderWrapper, Title, TitleBar } from './HeaderStyles';
import { PowerBiHeader } from './PowerBiHeader';
import { WorkspaceHeader } from './WorkspaceHeader';

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

  return (
    <HeaderWrapper sideSheetWidth={sideSheetWidth}>
      <TitleBar>
        <Title variant="h3">{title}</Title>
        {!!oldApps.find((s) => s.shortName === shortName) && (
          <span style={{ marginLeft: '16px', fontSize: '18px' }}>
            <div style={{ color: 'red' }}>
              This app has been replaced and will not receive any updates
            </div>
            <a href={makeRedirectUrl(shortName)}>Click here to go to the new app</a>
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
