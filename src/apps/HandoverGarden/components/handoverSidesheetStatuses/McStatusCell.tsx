import { CellProps } from '@equinor/Table';

import tinycolor from 'tinycolor2';
import { HandoverPackageStatus } from '../../models/HandoverPackage';
import { HandoverMcpkg } from '../../models/HandoverResources';
import { Pill, PillProps } from './PillStyle';
import { createGradientBackground, getPunchStatusGradient } from './utility';

export const McStatusCell = (
    props: CellProps<HandoverMcpkg, { status: HandoverPackageStatus; showOk: boolean }>
): JSX.Element => {
    const {
        value: { status, showOk },
    } = props;
    const background = getPunchStatusGradient(status);
    const color = tinycolor.mostReadable(background[0], ['#333333', '#f1f1f1'], {
        level: 'AAA',
        size: 'small',
    });

    const styling: PillProps = {
        backgroundImage: createGradientBackground(background),
        color: color.toHexString(),
        visibility: status === 'OK' && !showOk ? 'hidden' : 'visible',
    };

    return <Pill {...styling}>{status}</Pill>;
};
