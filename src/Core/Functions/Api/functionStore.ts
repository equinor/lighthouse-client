import { FunctionManifest } from '../Types/function';

export const functionSore: FunctionManifest[] = [
    {
        functionId: 'demo',
        type: 'demo',
        function: (): void => {
            const value = 'Demo Function!';
            console.log(value);
        },
    },
];
