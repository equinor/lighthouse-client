import { Factory } from '../Types/factory';
import { MenuItem } from './AddMenuButtonStyles';

interface AddButtonProps {
    factory: Factory;
}

export function AddMenuButton({ factory }: AddButtonProps): JSX.Element {
    return <MenuItem onClick={factory.onClick}>{factory?.title}</MenuItem>;
}
