import { CellProps } from '@equinor/Table';
import styled from 'styled-components';
import { InsulationBoxType } from '../../Types/pipetest';
import { getElectroViewCompletionStatusColor } from '../Electro/electroViewHelpers';
import { StatusCircle } from '../Garden/StatusCircle';

export const InsulationStatusTableCell = ({
    value,
}: CellProps<InsulationBoxType, InsulationBoxType>): JSX.Element => {
    return (
        <StatusItem>
            {value.procosysStatus}
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
