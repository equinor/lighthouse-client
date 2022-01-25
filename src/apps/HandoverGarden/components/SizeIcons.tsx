import styled from 'styled-components';
import { getTextColor, Status } from '../utility/handoverItemMapping';
import { getLargeSizeIcon, getMediumSizeIcon, getSmallSizeIcon } from '../utility/icons';

type SizeIconsProps = {
    size: string;
    status: Status;
};

export const SizeIcons = ({ size, status }: SizeIconsProps): JSX.Element => {
    const iconSvg: string =
        size === 'small'
            ? getSmallSizeIcon(getTextColor(status))
            : size === 'medium'
            ? getMediumSizeIcon(getTextColor(status))
            : getLargeSizeIcon(getTextColor(status));
    return (
        <object
            style={{ width: '12px', height: '14px' }}
            type="image/svg+xml"
            data={'data:image/svg+xml;charset=utf8,' + iconSvg}
        />
    );
};

const PackageSize = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10px;
    height: 100%;
`;

const Line = styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
    width: 100%;
    height: 2px;
    margin: 1px;
`;

export const SizeIconsHtml = ({ size, status }: SizeIconsProps): JSX.Element => {
    const lineCount = size === 'small' ? 1 : size === 'medium' ? 2 : 3;
    const color = getTextColor(status);
    const lines = new Array<JSX.Element>(lineCount).fill(<Line color={color} />);
    return <PackageSize>{lines.map((Line) => Line)}</PackageSize>;
};
