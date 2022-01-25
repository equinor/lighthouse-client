import { useSelectFactory } from '../Hooks/useSelectFactory';
import { Factory } from '../Types/factory';
import { MenuItem } from './AddMenuButtonStyles';

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddMenuButton({ factory, scope }: AddButtonProps): JSX.Element {
    const onClick = useSelectFactory(factory?.factoryId, scope);
    return <MenuItem onClick={onClick}>{factory?.title}</MenuItem>;
}
