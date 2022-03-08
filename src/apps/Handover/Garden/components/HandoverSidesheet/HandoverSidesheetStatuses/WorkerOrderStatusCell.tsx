import { CellProps } from 'react-table';
import styled from 'styled-components';
import { followUpColorMapRecord } from '../../../utility/handoverItemMapping';
import tinycolor from 'tinycolor2';
import { createGradient, createGradientBackground, getHandoverWorkOrderStatus } from './utility';
import { HandoverWorkOrder } from '@equinor/GardenUtils';

type StyleProps = {
    display: string;
    padding: string;
    fontSize: number;
    borderRadius: number;
    backgroundImage: string;
    color: string;
};

const WOStatus = styled.span<StyleProps>``;

export const WorkOrderStatusCell = ({
    value,
}: CellProps<HandoverWorkOrder, HandoverWorkOrder>): JSX.Element => {
    const status = getHandoverWorkOrderStatus(value);
    const background = createGradient(followUpColorMapRecord[status]);
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
        <WOStatus title={getHandoverWorkOrderStatus(value)} {...styles}>
            CON
        </WOStatus>
    );
};
