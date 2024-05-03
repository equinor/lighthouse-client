import { Typography } from '@equinor/eds-core-react-old';
import { useSettings } from '../Hooks/useClientContext';
import { Content, Header, ViewportWrapper } from './clientHomeStyles';
import { AppLoaderWrapper } from '../../../fusion-framework/AppLoaderWrapper';

export const ClientHome = (): JSX.Element => {
  const { user } = useSettings();

  return (
    <>
      <Content>
        <Header>
          <Typography variant="h3">Welcome {user?.displayName}</Typography>
        </Header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ViewportWrapper> 
            <AppLoaderWrapper appKey={"completion-analytics"} />
          </ViewportWrapper>
        </div>
      </Content>
    </>
  );
};
