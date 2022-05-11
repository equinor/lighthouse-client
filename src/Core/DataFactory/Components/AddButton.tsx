import { useSelectFactory } from '../Hooks/useSelectFactory';
import { Factory } from '../Types/factory';

interface AddButtonProps {
    factory?: Factory;
    scope?: Record<string, unknown>;
}

export function AddButton({ factory }: AddButtonProps): JSX.Element {
    const onClick = useSelectFactory(factory?.factoryId ?? '');
    return <button onClick={onClick}>+</button>;
}
