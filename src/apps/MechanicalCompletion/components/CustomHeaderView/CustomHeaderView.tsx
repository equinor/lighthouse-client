import { memo } from 'react';
import { CustomHeaderView } from '../../../../components/ParkView/Models/gardenOptions';
import { McPackage } from '../../types';
import { HeaderContainer } from './CustomHeaderView.styles';

const McGardenHeader = ({ garden, columnIndex, groupByKey }: CustomHeaderView<McPackage>) => {
    const label =
        groupByKey === 'finalPunch'
            ? 'M-01'
            : groupByKey === 'punchAccepted'
            ? 'M-02'
            : groupByKey === 'rfcc'
            ? 'M-04'
            : 'M-03';

    const mcCount = garden[columnIndex].items.filter((mcPackage) => {
        switch (groupByKey) {
            case 'finalPunch':
                return !!mcPackage.finalPunchActualDate;

            case 'punchAccepted':
                return !!mcPackage.punchAcceptActualDate || !!mcPackage.rfccActualDate;
            case 'rfcc':
                return !!mcPackage.rfccActualDate;
        }
        return !!mcPackage.rfccIsShipped;
    }).length;

    return (
        <HeaderContainer>
            {garden[columnIndex].value}
            <div>
                {label}: {`${mcCount}/${garden[columnIndex].items.length}`}
            </div>
        </HeaderContainer>
    );
};
export default memo(McGardenHeader);
