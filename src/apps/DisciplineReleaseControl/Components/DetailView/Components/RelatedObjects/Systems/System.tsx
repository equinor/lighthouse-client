import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { System as SystemInterface } from '../../../../../Types/disciplineReleaseControl';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';
import { getSystems } from '../../../../../Api/PCS/getSystems';
import { useEffect, useState } from 'react';
import { System as PCSSystem } from '../../../../../Api/Search/PCS/Types/system';
import { QueryKeys } from '../../../../../Api/queryKeys';

interface SystemProps {
    system: SystemInterface;
}

export const System = ({ system }: SystemProps): JSX.Element => {
    const { data } = useQuery(QueryKeys.Systems, getSystems, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const [foundSystem, setFoundSystem] = useState<PCSSystem | null>();

    useEffect(() => {
        if (data) {
            const match = data.find((x) => x.Id === system.procosysId);
            setFoundSystem(match);
        }
    }, [data, system.procosysId]);

    return (
        <Wrapper key={system.id}>
            <Icon name="placeholder_icon" />
            <Link
                href={`https://${
                    isProduction() ? 'procosys' : 'procosystest'
                }.equinor.com/JOHAN_CASTBERG/Completion#System|${system.procosysId}`}
                target="_blank"
            >
                SYS_{system.procosysCode} - {foundSystem?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
