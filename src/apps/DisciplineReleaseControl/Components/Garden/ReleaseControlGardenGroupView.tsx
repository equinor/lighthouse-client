import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ChevronDown, ChevronUp, CustomGroupView } from '@equinor/ParkView';
import { memo } from 'react';
import { Pipetest } from '../../Types/pipetest';
import {
    Chevron,
    HTGardenSubGroup,
    HTSubGroupText,
    SubGroupText,
    SubGroupWrapper
} from './GardenItemStyles';

const ReleaseControlGardenGroupView = ({
    data,
    columnExpanded,
    onClick,
    onGroupeSelect,
}: CustomGroupView<Pipetest>) => {
    const handleSubGroupClick = () => {
        if (data.value.startsWith('HT')) {
            onGroupeSelect && onGroupeSelect(data);
        }
    };
    return (
        <SubGroupWrapper>
            {data.value.startsWith('HT') ? (
                <HTGardenSubGroup>
                    <Icon
                        size={16}
                        style={{ marginLeft: '4px' }}
                        color={tokens.colors.text.static_icons__default.hex}
                        name="heat_trace"
                    />
                    <HTSubGroupText onClick={handleSubGroupClick}>{data.value}</HTSubGroupText>
                </HTGardenSubGroup>
            ) : (
                <SubGroupText>{data.value}</SubGroupText>
            )}

            <Chevron onClick={onClick}>{columnExpanded ? <ChevronUp /> : <ChevronDown />}</Chevron>
        </SubGroupWrapper>
    );
};

export default memo(ReleaseControlGardenGroupView);
