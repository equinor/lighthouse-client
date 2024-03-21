import { memo, useMemo } from 'react';
import { Punch } from '../../types';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { getPunchStatusColors, getPunchStatusTextColors, getDotsColor } from './utils';
import { FlagIcon } from '../../components/icons/FlagIcon';
import {
  StyledItemText,
  StyledPunchItem,
  StyledRoot,
  StyledStatusCircles,
} from './punchGardenItem.styles';

function PunchGardenItem({
  data,
  itemKey,
  onClick,
  columnExpanded,
  width: itemWidth = 300,
  depth,
  isSelected,
}: CustomItemView<Punch>): JSX.Element {
  const statusColor = getPunchStatusColors(data.status);
  const textColor = getPunchStatusTextColors(data.status);
  const width = useMemo(() => (depth ? 100 - depth * 3 : 100), [depth]);
  const maxWidth = useMemo(() => itemWidth * 0.95, [itemWidth]);
  const punchTypeColor = getDotsColor(data.category);
  return (
    <StyledRoot>
      <StyledPunchItem
        style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
        backgroundColor={statusColor}
        textColor={textColor}
        onClick={onClick}
        isSelected={isSelected}
      >
        {data.materialRequired && <FlagIcon color={textColor} />}
        <StyledItemText>{data[itemKey]}</StyledItemText>
        <StyledStatusCircles typeColor={punchTypeColor} />
      </StyledPunchItem>
      {columnExpanded && <>{data.description}</>}
    </StyledRoot>
  );
}
export default memo(PunchGardenItem);
