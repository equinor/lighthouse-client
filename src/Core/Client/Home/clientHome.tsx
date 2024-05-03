import { Typography } from '@equinor/eds-core-react-old';
import { useSettings } from '../Hooks/useClientContext';
import { Content, Header, ViewportWrapper } from './clientHomeStyles';
import { AppLoaderWrapper } from '../../../fusion-framework/AppLoaderWrapper';

export const ClientHome = (): JSX.Element => {
  const { user } = useSettings();

  return (
    <>
      <Content>
          <ViewportWrapper> 
            <AppLoaderWrapper appKey={"completion-analytics"} />
          </ViewportWrapper>
      </Content>
    </>
  );
};
