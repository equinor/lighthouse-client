import { Tabs } from '@equinor/eds-core-react-old';
import styled from 'styled-components';

export const ThreeDModel = styled.div`
  height: ${() => window.innerHeight - 250 + 'px'};
`;

export const Panel = styled(Tabs.Panel)`
  padding: 0;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  height: ${() => window.innerHeight - 500 + 'px'};
`;
