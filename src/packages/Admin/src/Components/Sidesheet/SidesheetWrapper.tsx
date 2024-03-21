import { SidesheetApi } from '@equinor/sidesheet';
import { Wrapper } from './sidesheet.styles';

interface SidesheetWrapperProps {
  item: string;
  actions: SidesheetApi;
}

export function SidesheetWrapper({ item, actions }: SidesheetWrapperProps): JSX.Element {
  // useScopeChangeMutationWatcher(item.id);
  // useOctopusErrorHandler();
  // useGetScopeChangeRequest(item.id, item);
  // useScopeChangeAccess(item.id);
  // useSidesheetEffects(actions, toggleEditMode, item.id, () => setRevisionMode(true));

  // if (false) {
  //     return <></>;
  // }

  return (
    <Wrapper>
      <div>{/* <ErrorBanner clearOnPropChange={item.id} /> */}</div>
    </Wrapper>
  );
}
