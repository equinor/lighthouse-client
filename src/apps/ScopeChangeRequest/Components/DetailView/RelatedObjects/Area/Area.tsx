import { ScopeChangeArea as AreaInterface } from '../../../../types/scopeChangeRequest';
import { Link, Wrapper } from '../WrapperStyles';
import { useQuery } from 'react-query';
import { Area as PCSArea, proCoSysQueries } from '@equinor/Workflow';
import { useFacility } from '@equinor/lighthouse-portal-client';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    const { procosysPlantId } = useFacility();
    const { getAreaByCodeQuery } = proCoSysQueries;

    const { data } = useQuery<unknown, unknown, PCSArea>(
        getAreaByCodeQuery(area.procosysCode, procosysPlantId)
    );

    return (
        <Wrapper key={area.id}>
            <Link>
                {area.procosysCode} - {data?.Description}
            </Link>
        </Wrapper>
    );
};
