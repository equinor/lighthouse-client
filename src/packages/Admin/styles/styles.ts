import { Button, Typography } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
`;

export const AdminMenuWrapper = styled.div`
  min-width: 310px;
  border-right: 1px solid ${tokens.colors.ui.background__medium.rgba};
  background-color: ${tokens.colors.ui.background__default.rgba};
  overflow: hidden;
`;

export const MenuWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
`;

export const FavoritesDividerWrapper = styled.div`
  padding-left: 48px;
  padding-right: 1rem;
`;

export const Row = styled.div`
  width: 100%;
`;

export const MenuHeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Heading = styled.div`
  display: flex;
  align-content: center;
  align-items: flex-end;
  padding-left: 48px;
  flex-grow: 1;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 23px;
  width: 240px;
  font-size: 14px;
  font-weight: 500;
`;

interface MenuItemProps {
  disabled?: boolean;
  active?: boolean;
}

export const Item = styled.div<MenuItemProps>`
  flex-grow: 1;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 23px;
  width: 240px;
  font-size: 14px;
  > p {
    font-size: 14px;
  }

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

export const Title = styled(Typography)<MenuItemProps>`
  font-size: 14px !important;
  font-weight: ${({ active }) => (active ? 'bold' : 500)};
  color: ${({ active }) =>
    active
      ? `${tokens.colors.interactive.primary__hover.rgba}`
      : `${tokens.colors.text.static_icons__default.hex}`};
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  position: relative;
`;

export const Loading = styled.div`
  width: 100%;
  min-width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
`;

export const AdminWorkspaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  overflow: auto;
  padding-left: 20px;
  padding-bottom: 20px;
`;

export const NewButton = styled(Button)`
  margin-bottom: 20px;
  margin-top: 16px;
  width: 140px;
`;

export const ButtonText = styled.div`
  padding: 8px;
`;
