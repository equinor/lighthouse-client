import { ScopeChangeArea as AreaInterface } from '../../../../types/scopeChangeRequest';
import { Link, Wrapper } from '../WrapperStyles';
import { useFacility } from '../../../../../../Core/Client/Hooks';
import { proCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { Area as PCSArea } from '../../../../types/ProCoSys/area';

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
