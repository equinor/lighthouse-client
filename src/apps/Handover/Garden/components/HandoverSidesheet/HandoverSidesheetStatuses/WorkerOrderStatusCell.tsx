import { CellProps } from 'react-table';
import { followUpColorMapRecord, FollowUpStatuses } from '../../../utility/handoverItemMapping';
import tinycolor from 'tinycolor2';
import { createGradient, createGradientBackground } from './utility';
import { HandoverWorkOrder } from '../../../models';

export const WorkOrderStatusCell = ({
    value,
}: CellProps<HandoverWorkOrder, FollowUpStatuses>): JSX.Element | null => {
    if (value === null) {
        return null;
    }
    const background = createGradient(followUpColorMapRecord[value]);
    const color = tinycolor.mostReadable(background[0], ['#00000', '#ffffff'], {
        level: 'AAA',
        size: 'small',
    });

    const styles = {
        display: 'inline-block',
        padding: '2px 4px',
        fontSize: 10,
        borderRadius: 5,
        backgroundImage: createGradientBackground(background),
        color: color.toHexString(),
    };

    return (
        <span title={value} style={styles}>
            CON
        </span>
    );
};
