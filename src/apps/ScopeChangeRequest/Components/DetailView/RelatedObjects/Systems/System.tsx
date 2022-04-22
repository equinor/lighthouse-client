import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeSystem } from '../../../../types/scopeChangeRequest';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { System as PCSSystem } from '../../../../types/ProCoSys/system';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';

interface SystemProps {
    system: ScopeChangeSystem;
}

export const System = ({ system }: SystemProps): JSX.Element => {
    const { procosysPlantId } = useFacility();

    const { getSystemsQuery } = ProCoSysQueries;
    const { data } = useQuery<unknown, unknown, PCSSystem[]>(getSystemsQuery(procosysPlantId));

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
                href={`https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#System|${system.procosysId}`}
                target="_blank"
            >
                {system.procosysCode} - {foundSystem?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
