import { CellProps } from '@equinor/Table';
import tinycolor from 'tinycolor2';
import { HandoverPackageStatus, HandoverMcpkg } from '../../../models';
import { Pill, PillProps } from './PillStyle';
import { createGradientBackground, getPunchStatusGradient } from './utility';

export const McStatusCell = (
    props: CellProps<HandoverMcpkg, HandoverPackageStatus | null>
): JSX.Element | null => {
    const { value } = props;

    if (value === null) {
        return null;
    }

    const background = getPunchStatusGradient(value);
    const color = tinycolor.mostReadable(background[0], ['#333333', '#f1f1f1'], {
        level: 'AAA',
        size: 'small',
    });

    const styling: PillProps = {
        backgroundImage: createGradientBackground(background),
        color: color.toHexString(),
    };

    return <Pill {...styling}>{value}</Pill>;
};
