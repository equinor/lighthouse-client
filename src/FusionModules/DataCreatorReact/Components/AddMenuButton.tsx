import { CreatorManifest } from '../../DataCreatorModule';
import { useDataCreator } from '../Hooks/useCreator';
import { MenuItem } from './AddMenuButtonStyles';

interface AddButtonProps {
    creator: CreatorManifest;
}

export function AddMenuButton({ creator }: AddButtonProps): JSX.Element {
    const { openCreatorById } = useDataCreator();
    return <MenuItem onClick={() => openCreatorById(creator.widgetId)}>{creator?.title}</MenuItem>;
}
