import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../packages/Components/Icon';

interface AttachmentVisualProps {
  name: string;
  onRemove?: (name: string) => void;
  fileSize: number;
}
export const AttachmentVisual = ({
  name,
  onRemove,
  fileSize,
}: AttachmentVisualProps): JSX.Element => {
  return (
    <AttachmentVisualStyle>
      <Icon name="copy" color={tokens.colors.interactive.primary__resting.hex} />
      <div>{name}</div>
      <div>
        {fileSize && (fileSize / 1000 ** 2).toFixed(2)}
        MB
      </div>

      <ClickableIcon
        name="clear"
        color={tokens.colors.interactive.primary__resting.hex}
        onClick={() => onRemove && onRemove(name)}
      />
    </AttachmentVisualStyle>
  );
};

const AttachmentVisualStyle = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.5em;
  font-size: 16px;
  color: ${tokens.colors.text.static_icons__default.hex};
`;
