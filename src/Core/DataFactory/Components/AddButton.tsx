import { Factory } from '../Types/factory';

interface AddButtonProps {
    factory?: Factory;
}

export function AddButton({ factory }: AddButtonProps): JSX.Element {
    if (!factory) return <></>;
    return <button onClick={factory.onClick}>+</button>;
}
