import { AppGroupe } from '@equinor/portal-client';
import { Item } from '../Sheard/Styles';

interface GroupItemProps {
    appGroup: AppGroupe;

    onClick?: () => void;
}

export const GroupItem = ({ appGroup, onClick }: GroupItemProps): JSX.Element => {
    return <Item onClick={onClick}>{appGroup.name}</Item>;
};
