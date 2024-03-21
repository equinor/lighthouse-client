import { ReleaseControlItem, MidSection, Root, Title } from './GardenItemStyles';
import { CustomItemView } from '@equinor/ParkView';

import { memo } from 'react';
import { ReleaseControl } from '../../types/releaseControl';

const ReleaseControlGardenItem = ({
  data,
  itemKey,
  onClick,
  columnExpanded,
  isSelected,
}: CustomItemView<ReleaseControl>) => {
  return (
    <Root>
      <ReleaseControlItem isSelected={isSelected} onClick={onClick} isExpanded={columnExpanded}>
        <MidSection expanded={columnExpanded}>
          <Title>{data[itemKey]}</Title>
        </MidSection>
      </ReleaseControlItem>
      {columnExpanded && data.description}
    </Root>
  );
};

export default memo(ReleaseControlGardenItem);
