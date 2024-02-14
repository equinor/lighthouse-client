import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '../../../../packages/Components/Icon';
import { AttachmentVisualStyle } from './attachments.styles';

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
