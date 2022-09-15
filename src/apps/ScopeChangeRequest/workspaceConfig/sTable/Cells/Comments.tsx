import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { CenterIcon } from './cells.styles';

interface CommentsProps {
    hasComments: boolean;
}
export const Comments = ({ hasComments }: CommentsProps) => (
    <>
        {hasComments && (
            <CenterIcon>
                <Icon
                    name={'comment_chat'}
                    color={`${tokens.colors.text.static_icons__default.hex}`}
                />
            </CenterIcon>
        )}
    </>
);
