import { ScopeChangeSystem } from '../../../../types/scopeChangeRequest';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { System as PCSSystem } from '../../../../types/ProCoSys/system';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { Link, Wrapper, TextWrapper } from '../WrapperStyles';

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
        <Wrapper
            onClick={() =>
                window.open(
                    `https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#System|${system.procosysId}`,
                    '_blank'
                )
            }
            key={system.id}
        >
            <Icon name="placeholder_icon" />
            <TextWrapper>
                <Link>
                    {system.procosysCode} - {foundSystem?.Description}
                </Link>
            </TextWrapper>
        </Wrapper>
    );
};
