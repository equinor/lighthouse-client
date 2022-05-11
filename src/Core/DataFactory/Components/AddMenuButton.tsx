import { useSelectFactory } from '../Hooks/useSelectFactory';
import { Factory } from '../Types/factory';
import { MenuItem } from './AddMenuButtonStyles';

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddMenuButton({ factory }: AddButtonProps): JSX.Element {
    const onClick = useSelectFactory(factory?.factoryId ?? '');
    if (!factory) return <></>;
    return <MenuItem onClick={onClick}>{factory?.title}</MenuItem>;
}
