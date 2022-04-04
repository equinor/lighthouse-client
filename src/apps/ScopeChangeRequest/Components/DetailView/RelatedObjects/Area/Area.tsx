import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeArea as AreaInterface } from '../../../../types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';
import { getAreaByCode } from '../../../../api/PCS/getAreaByCode';
import { useInfiniteCachedQuery } from '../../../../hooks/react-Query/useInfiniteCachedQuery';
import { proCoSysQueryKeys } from '../../../../sKeys/proCoSysQueryKeys';
import { useFacility } from '../../../../../../Core/Client/Hooks';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    const { area: areaKey } = proCoSysQueryKeys();
    const { procosysPlantId } = useFacility();

    const { data } = useInfiniteCachedQuery(
        areaKey(area.procosysCode),
        () => getAreaByCode(procosysPlantId, area.procosysCode),
        {
            retry: false,
            retryDelay: 5000,
        }
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
`;
