import { AppLoaderWrapper } from '../../fusion-framework/AppLoaderWrapper';
import { useLocationKey } from '../../hooks/useLocationKey/useLocationKey';

export function FusionAppLoaderRoute() {
  const location = useLocationKey();
  return <AppLoaderWrapper appKey={location} />;
}
