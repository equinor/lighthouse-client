import { ChevronDown, ChevronRight, CustomGroupView } from '@equinor/ParkView';
import { memo } from 'react';
import { checklistTagFunc } from '../../utils/helpers/tableHelpers';
import { Pipetest } from '../../Types/pipetest';
import { WorkflowCompact } from '../Workflow/Components/WorkflowCompact';
import {
    createChecklistTestSteps,
    getPipetestStatusValueForHTCable,
} from '../../utils/helpers/gardenFunctions';
import {
    Chevron,
    HTGardenSubGroup,
    HTSubGroupText,
    SubGroupText,
    SubGroupWrapper,
} from './GardenItemStyles';

const ReleaseControlGardenGroupView = ({
    data,
    columnExpanded,
    onClick,
    onGroupeSelect,
}: CustomGroupView<Pipetest>) => {
    const handleSubGroupClick = () => {
        if (data.value.startsWith('HT')) {
            onGroupeSelect && onGroupeSelect({ value: data.value, items: data.items || [] });
        }
    };
    return (
        <SubGroupWrapper>
            <Chevron onClick={onClick}>
                {columnExpanded ? <ChevronDown /> : <ChevronRight />}
            </Chevron>

            {data.value.startsWith('HT') ? (
                <HTGardenSubGroup>
                    <HTSubGroupText onClick={handleSubGroupClick}>{data.value}</HTSubGroupText>
                    <WorkflowCompact
                        steps={createChecklistTestSteps(
                            data.items,
                            data.value,
                            getPipetestStatusValueForHTCable(data.items)
                        )}
                        statusDotFunc={checklistTagFunc}
                        spanDirection={'horizontal'}
                        dotSize={14}
                        isPopoverDisabled={true}
                    />
                </HTGardenSubGroup>
            ) : (
                <SubGroupText>{data.value}</SubGroupText>
            )}
        </SubGroupWrapper>
    );
};

export default memo(ReleaseControlGardenGroupView);
