import { statusColorMap } from '@equinor/GardenUtils';
import { memo, useMemo } from 'react';
import { useParkViewContext } from '../../../../components/ParkView/Context/ParkViewProvider';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { McPackage } from '../../types';
import { commStatusColors } from '../../utils/config/theme';
import { getItemContentsColor } from '../../utils/helpers/getItemContentsColor';
import { getCommissioningStatus } from '../../utils/helpers/getStatuses';
import { getTagSize } from '../../utils/helpers/getTagSize';
import { ItemText, McWrapper, Root, Sizes, StatusCircles } from './CustomItemView.styles';

const McGardenItem = ({
    data,
    itemKey,
    columnExpanded,
    onClick,
    selectedItem,
    depth,
    width: itemWidth = 300,
}: CustomItemView<McPackage>) => {
    const { customState } = useParkViewContext();
    const size = useMemo(
        () => getTagSize(data, (customState?.['averageTagVolume'] as number) || 0),
        [data, customState]
    );
    const status = useMemo(() => getCommissioningStatus(data), [data]);
    const backgroundColor = useMemo(() => commStatusColors[status], [status]);
    const contentsColor = useMemo(() => getItemContentsColor(status), [status]);
    const mcDotColor = useMemo(() => statusColorMap[data.mcStatus], [data.mcStatus]);
    const commDotColor = useMemo(() => statusColorMap[data.commPkgStatus], [data.commPkgStatus]);
    const width = useMemo(() => (depth ? 100 - depth * 3 : 97), [depth]);
    const maxWidth = useMemo(() => itemWidth * 0.98, [itemWidth]);
    return (
        <Root>
            <McWrapper
                onClick={onClick}
                backgroundColor={backgroundColor}
                textColor={contentsColor}
                isSelected={selectedItem?.mcPkgNumber === data.mcPkgNumber}
                style={{ width: `${columnExpanded ? 100 : width}%`, maxWidth }}
            >
                <Sizes color={contentsColor} size={size} />
                <ItemText> {data[itemKey]}</ItemText>

                <StatusCircles mcColor={mcDotColor} commColor={commDotColor} />
            </McWrapper>
            {columnExpanded && data.description}
        </Root>
    );
};

export default memo(McGardenItem);
