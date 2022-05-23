import { CreatorManifest } from '../../DataCreatorModule';
import { useDataCreator } from '../Hooks/useCreator';
import { MenuItem } from './AddMenuButtonStyles';

interface AddButtonProps {
    creator: CreatorManifest;
}

export function AddMenuButton({ creator }: AddButtonProps): JSX.Element {
    const { openCreatorById } = useDataCreator();
    return (
        <MenuItem
            disabled={!creator.props.hasAccess}
            title={creator.props.hasAccess ? creator?.title : 'Contact support for access'}
            onClick={() => openCreatorById(creator.widgetId)}
        >
            {creator?.title}
        </MenuItem>
    );
}
