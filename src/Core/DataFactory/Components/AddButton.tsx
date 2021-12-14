import { useSelectFactory } from '../Hooks/useSelectFactory';
import { Factory } from '../Types/factory';

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddButton({ factory, scope }: AddButtonProps): JSX.Element {
    const onClick = useSelectFactory(factory?.factoryId, scope);
    return <button onClick={onClick}>+</button>;
}
