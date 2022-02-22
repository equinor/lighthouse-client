import { CellProps } from 'react-table';
import tinycolor from 'tinycolor2';
import { colorMap } from '../../../utility/handoverItemMapping';
import { Pill, PillProps } from './PillStyle';
import { createGradient, createGradientBackground } from './utility';
import { HandoverPackageStatus, HandoverMcpkg } from '../../../models';

export const RfccStatusCell = (
    props: CellProps<HandoverMcpkg, { rfccStatus: HandoverPackageStatus }>
): JSX.Element => {
    const {
        value: { rfccStatus },
    } = props;
    const background = createGradient(colorMap[rfccStatus]);

    const styling: PillProps = {
        backgroundImage: createGradientBackground(background),
        color: tinycolor
            .mostReadable(background[0], ['#333333', '#f1f1f1'], {
                level: 'AAA',
                size: 'small',
            })
            .toHexString(),
    };

    return <Pill {...styling}>{rfccStatus.replace('RFCC ', '')}</Pill>;
};
