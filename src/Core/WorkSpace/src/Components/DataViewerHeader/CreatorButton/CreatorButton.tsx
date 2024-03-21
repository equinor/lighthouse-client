import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useDataContext } from '../../../Context/DataProvider';
import { TabButton } from '../../ToggleButton';
import { Divider } from '../HeaderStyles';
import { openSidesheetById } from '../../../../../../packages/Sidesheet/Functions';
import {
  releaseCreatorAccessFunction,
  releaseCreatorComponent,
} from '../../../../../../apps/ReleaseControl/workspaceConfig/DataCreator/dataCreatorConfig';
import {
  changeCreatorAccessFunction,
  changeCreatorComponent,
} from '../../../../../../apps/ScopeChangeRequest/workspaceConfig/dataCreatorConfig';
import { useQuery } from 'react-query';

const getApp = (key: string) => {
  switch (key) {
    case 'change':
      return {
        checkAccessAsync: changeCreatorAccessFunction.function,
        id: changeCreatorComponent.widgetId,
      };

    case 'release':
      return {
        checkAccessAsync: releaseCreatorAccessFunction.function,
        id: releaseCreatorComponent.widgetId,
      };

    default:
      return null;
  }
};

export const CreatorButton = (): JSX.Element => {
  const { key } = useDataContext();

  const app = getApp(key);

  const { data, isLoading, error } = useQuery([key, 'access'], async () => {
    if (app) {
      return app.checkAccessAsync();
    } else {
      return false;
    }
  });

  return (
    <>
      {!!app && (
        <TabButton
          color={tokens.colors.interactive.primary__resting.hex}
          aria-disabled={!data}
          onClick={() => data && openSidesheetById(app.id)}
          width={'48px'}
          aria-selected={false}
          title={!!data ? undefined : 'Contact support for access'}
        >
          <Icon name={'add'} />
        </TabButton>
      )}
      <Divider />
    </>
  );
};
