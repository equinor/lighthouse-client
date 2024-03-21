import { CellProps } from 'react-table';
import tinycolor from 'tinycolor2';
import { colorMap } from '../../../utility/handoverItemMapping';
import { HandoverPackageStatus, HandoverMcpkg } from '../../../models';
import { Pill, PillProps } from './PillStyle';
import { createGradient, createGradientBackground } from './utility';

export const RfocStatusCell = (
  props: CellProps<HandoverMcpkg, HandoverPackageStatus | null>
): JSX.Element | null => {
  const { value } = props;

  if (value === null) {
    return null;
  }
  const background = createGradient(colorMap[value || 'OS']);

  const styling: PillProps = {
    backgroundImage: createGradientBackground(background),
    color: tinycolor
      .mostReadable(background[0], ['#333333', '#f1f1f1'], {
        level: 'AAA',
        size: 'small',
      })
      .toHexString(),
  };
  return <Pill {...styling}>{value?.replace('RFOC ', '')}</Pill>;
};
