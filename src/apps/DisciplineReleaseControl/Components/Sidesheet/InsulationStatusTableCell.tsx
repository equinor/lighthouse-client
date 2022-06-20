import { CellProps } from '@equinor/Table';
import styled from 'styled-components';
import { StatusCircle } from '../../../../packages/GardenUtils/src';
import { InsulationBoxType } from '../../Types/pipetest';
import { getElectroViewCompletionStatusColor } from '../Electro/electroViewHelpers';

export const InsulationStatusTableCell = ({
    value,
}: CellProps<InsulationBoxType, InsulationBoxType>): JSX.Element => {
    return (
        <StatusItem>
            <StatusText>{value.procosysStatus}</StatusText>
            {value.procosysStatus && (
                <StatusCircle
                    statusColor={getElectroViewCompletionStatusColor(value.procosysStatus)}
                />
            )}
        </StatusItem>
    );
};

export const StatusItem = styled.div`
    display: flex;
    flex-direction: horizontal;
`;

export const StatusText = styled.div`
    width: 20px;
`;
