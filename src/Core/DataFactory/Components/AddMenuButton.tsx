import { Menu } from '@equinor/eds-core-react';
import { useSelectFactory } from '../Hooks/useSelectFactory';
import { Factory } from '../Types/factory';

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddMenuButton({ factory, scope }: AddButtonProps): JSX.Element {
    const onClick = useSelectFactory(factory?.factoryId, scope);
    return <Menu.Item onClick={onClick}>{factory?.title}</Menu.Item>;
}
