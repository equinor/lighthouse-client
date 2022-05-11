import { Factory } from '../Types/factory';
import { MenuItem } from './AddMenuButtonStyles';

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddMenuButton({ factory }: AddButtonProps): JSX.Element {
    if (!factory) return <></>;
    return <MenuItem onClick={factory.onClick}>{factory?.title}</MenuItem>;
}
