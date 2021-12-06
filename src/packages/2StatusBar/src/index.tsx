import { StatusBar } from './2Components/2StatusBar/2StatusBar';
import { StatusItem } from './2Components/2StatusItem/2StatusItem';

export const data: StatusItem[] = [
    {
        title: 'Status',
        value: () => '50%',
        description: 'This is not good!',
        status: 'waring',
    },
    {
        title: 'Home',
        value: () => '60%',
        description: 'Im about way there.',
        status: 'ok',
    },
    {
        title: 'Status',
        value: () => '1',
        description: 'This is not good!',
        status: 'info',
    },
    {
        title: 'Signed',
        value: () => '5344',
        description: 'This is not good!',
        status: 'default',
    },
];

export function StatusBarApp(): JSX.Element {
    return (
        <div>
            <StatusBar data={data} />;
        </div>
    );
}
