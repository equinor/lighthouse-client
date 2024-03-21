import { ContentWrapper, Item, Title } from '../../../styles/styles';

interface MenuItemProps {
  id: string;
  name: string;
  active: boolean;
  handleChange: (index: number) => void;
}

export const MenuItem = ({ id, name, active, handleChange }: MenuItemProps): JSX.Element | null => {
  return (
    <Item
      active={active}
      title={name}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChange(Number(id));
      }}
    >
      <ContentWrapper>
        <Title active={active}>{name}</Title>
      </ContentWrapper>
    </Item>
  );
};
