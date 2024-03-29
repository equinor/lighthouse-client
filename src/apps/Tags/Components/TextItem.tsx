import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface TextItemProps {
  title: string;
  value?: string | number | JSX.Element;
  onClick?: () => void;
}

export function TextItem({ title, value, onClick }: TextItemProps): JSX.Element {
  return (
    <Wrapper>
      <BannerItemTitle>{title}</BannerItemTitle>
      <BannerItemValue
        title={value?.toString() || ''}
        action={!!onClick}
        onClick={() => onClick && onClick()}
      >
        {value}
      </BannerItemValue>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0.5rem 0;
`;

const BannerItemTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

const BannerItemValue = styled.div<{ action }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: ${tokens.colors.text.static_icons__default.hex};
  min-height: 24px;
  cursor: ${({ action }) => (action ? 'pointer' : 'default')};
  text-decoration-line: ${({ action }) => (action ? 'underline' : 'none')};
  overflow: hidden;
  white-space: nowrap;
  max-width: 400px;
  text-overflow: ellipsis;
`;
