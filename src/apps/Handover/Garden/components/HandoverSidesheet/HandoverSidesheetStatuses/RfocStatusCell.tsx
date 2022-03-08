import { CellProps } from 'react-table';
import tinycolor from 'tinycolor2';
import { colorMap } from '../../../utility/handoverItemMapping';
import { HandoverPackageStatus } from '../../../models';
import { Pill, PillProps } from './PillStyle';
import { createGradient, createGradientBackground } from './utility';
import { HandoverMcpkg } from '@equinor/GardenUtils';

export const RfocStatusCell = (
    props: CellProps<HandoverMcpkg, { rfocStatus: HandoverPackageStatus }>
): JSX.Element => {
    const {
        value: { rfocStatus },
    } = props;

    const background = createGradient(colorMap[rfocStatus]);

    const styling: PillProps = {
        backgroundImage: createGradientBackground(background),
        color: tinycolor
            .mostReadable(background[0], ['#333333', '#f1f1f1'], {
                level: 'AAA',
                size: 'small',
            })
            .toHexString(),
    };
    return <Pill {...styling}>{rfocStatus.replace('RFOC ', '')}</Pill>;
};
