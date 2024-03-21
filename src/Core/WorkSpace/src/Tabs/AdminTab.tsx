import { useWorkSpace } from '@equinor/WorkSpace';
import styled from 'styled-components';

export const AdminTab = (): JSX.Element | null => {
  const { adminOptions } = useWorkSpace();
  if (!adminOptions?.component) return null;
  const component = adminOptions.component;

  return <AdminWrapper>{component}</AdminWrapper>;
};

const AdminWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: left;
  height: 100%;
  padding: 20px;
  width: 100%;
`;
