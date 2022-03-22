import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getAreaByCode } from '../../../../../Api/PCS/getAreaByCode';
import { QueryKeys } from '../../../../../Api/queryKeys';
import { Area as AreaInterface } from '../../../../../Types/disciplineReleaseControl';
import { Wrapper } from '../WrapperStyles';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    const { data } = useQuery(
        [QueryKeys.Area, area.procosysId, area.procosysCode],
        () => getAreaByCode(area.procosysCode),
        {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
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
