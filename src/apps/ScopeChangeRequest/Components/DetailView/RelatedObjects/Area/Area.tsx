import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeArea as AreaInterface } from '../../../../types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';
import { useFacility } from '../../../../../../Core/Client/Hooks';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { Area as PCSArea } from '../../../../types/ProCoSys/area';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    const { procosysPlantId } = useFacility();
    const { getAreaByCodeQuery } = ProCoSysQueries;

    const { data } = useQuery<unknown, unknown, PCSArea>(
        getAreaByCodeQuery(area.procosysCode, procosysPlantId)
    );

    return (
        <Wrapper key={area.id}>
            <Icon color={tokens.colors.interactive.primary__resting.hex} name="pin_drop" />

            <Link>
                {area.procosysCode} - {data?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
