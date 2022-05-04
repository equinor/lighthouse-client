import { AppGroupe } from '@equinor/portal-client';
import { Item } from '../Sheard/Styles';

interface GroupItemProps {
    appGroup: AppGroupe;
    active: boolean;
    onClick?: () => void;
}

export const GroupItem = ({ appGroup, onClick, active }: GroupItemProps): JSX.Element => {
    return (
        <Item active={active} onClick={onClick}>
            {appGroup.name}
        </Item>
    );
};
