import { statusColorMap, StatusCircle } from '@equinor/GardenUtils';
import { memo } from 'react';
import { CustomItemView } from '../../../../components/ParkView/Models/gardenOptions';
import { McPackage } from '../../types';
import { commStatusColors } from '../../utils/config/theme';
import { getItemContentsColor } from '../../utils/helpers/getItemContentsColor';
import { getCommissioningStatus } from '../../utils/helpers/getStatuses';
import { McWrapper, Root } from './CustomItemView.styles';

const McGardenItem = ({ data, itemKey, columnExpanded, onClick }: CustomItemView<McPackage>) => {
    const status = getCommissioningStatus(data);
    const backgroundColor = commStatusColors[status];
    const contentsColor = getItemContentsColor(status);
    const mcDotColor = statusColorMap[data.mcStatus];
    const commDotColor = statusColorMap[data.commPkgStatus];
    return (
        <Root>
            <McWrapper
                onClick={onClick}
                backgroundColor={backgroundColor}
                textColor={contentsColor}
            >
                {data[itemKey]}
                <div style={{ display: 'flex' }}>
                    <StatusCircle statusColor={mcDotColor} />
                    <StatusCircle statusColor={commDotColor} />
                </div>
            </McWrapper>
            {columnExpanded && data.description}
        </Root>
    );
};

export default memo(McGardenItem);
