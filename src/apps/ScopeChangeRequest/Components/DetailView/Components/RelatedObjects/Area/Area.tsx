import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Area as AreaInterface } from '../../../../../Types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';
import { getAreaByCode } from '../../../../../Api/PCS/getAreaByCode';
import { useInfiniteCachedQuery } from '../../../../../Hooks/React-Query/useInfiniteCachedQuery';
import { useScopeChangeContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useScopechangeQueryKeyGen } from '../../../../../Hooks/React-Query/useScopechangeQueryKeyGen';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    const { request } = useScopeChangeContext();
    const { referencesKeys } = useScopechangeQueryKeyGen(request.id);

    const { data } = useInfiniteCachedQuery(referencesKeys.area(area.procosysCode), () =>
        getAreaByCode(area.procosysCode)
    );

    return (
        <Wrapper key={area.id}>
            <Icon color={tokens.colors.interactive.primary__resting.hex} name="pin_drop" />

            <Link>
                LOC_{area.procosysCode} - {data?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
