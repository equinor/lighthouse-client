import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';

EdsIcon.add({ ...icons });

type IconProps = {
    name?: string;
    title?: string;
    color?: string;
    size?: 16 | 24 | 32 | 40 | 48 | undefined;
    quantity?: number;
    alt?: string;
    style?: React.CSSProperties;
};

const Icon = ({ name, title, color, size, style }: IconProps): JSX.Element => {
    return <EdsIcon style={style} name={name} title={title} color={color} size={size} />;
};

export default Icon;
