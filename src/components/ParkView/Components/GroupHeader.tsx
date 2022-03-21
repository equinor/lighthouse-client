import { GardenGroups } from '../Models/data';
import { Count, Groupe, Title } from '../Styles/common';

type GardenHeaderProps<T> = {
    garden: GardenGroups<T>;
    columnKey: string;
};

export function GroupHeader<T>({ garden, columnKey }: GardenHeaderProps<T>): JSX.Element {
    return (
        <Groupe>
            {garden[columnKey].status?.statusElement}
            <Title>{garden[columnKey].value}</Title>
            <Count>({garden[columnKey].count})</Count>
        </Groupe>
    );
}
