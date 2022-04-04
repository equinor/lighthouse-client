import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeSystem as SystemInterface } from '../../../../types/scopeChangeRequest';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { getSystems } from '../../../../api/PCS/getSystems';
import { useEffect, useState } from 'react';
import { System as PCSSystem } from '../../../../types/ProCoSys/system';
import { useInfiniteCachedQuery } from '../../../../hooks/React-Query/useInfiniteCachedQuery';
import { proCoSysQueryKeys } from '../../../../keys/proCoSysQueryKeys';

interface SystemProps {
    system: SystemInterface;
}

export const System = ({ system }: SystemProps): JSX.Element => {
    const { systems: systemsKey } = proCoSysQueryKeys();
    const { procosysPlantId } = useFacility();
    const { data } = useInfiniteCachedQuery(systemsKey, () => getSystems(procosysPlantId));

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
`;
