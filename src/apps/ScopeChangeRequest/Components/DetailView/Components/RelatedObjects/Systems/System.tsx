import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { System as SystemInterface } from '../../../../../Types/scopeChangeRequest';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { getSystems } from '../../../../../Api/PCS/getSystems';
import { useEffect, useState } from 'react';
import { System as PCSSystem } from '../../../../../Types/ProCoSys/system';
import { useInfiniteCachedQuery } from '../../../../../Hooks/React-Query/useInfiniteCachedQuery';
import { useScopechangeQueryKeyGen } from '../../../../../Hooks/React-Query/useScopechangeQueryKeyGen';
import { useScopeChangeContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';

interface SystemProps {
    system: SystemInterface;
}

export const System = ({ system }: SystemProps): JSX.Element => {
    const { request } = useScopeChangeContext();
    const { referencesKeys } = useScopechangeQueryKeyGen(request.id);

    const { data } = useInfiniteCachedQuery(referencesKeys.systems, getSystems);

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
