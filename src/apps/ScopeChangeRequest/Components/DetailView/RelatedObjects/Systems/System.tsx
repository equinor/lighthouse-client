import { ScopeChangeSystem } from '../../../../types/scopeChangeRequest';
import { useFacility } from '../../../../../../Core/Client';
import { useEffect, useState } from 'react';
import { proCoSysQueries, System as PCSSystem } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { Link, Wrapper, TextWrapper } from '../WrapperStyles';
import { proCoSysUrls } from '@equinor/procosys-urls';

interface SystemProps {
  system: ScopeChangeSystem;
}

export const System = ({ system }: SystemProps): JSX.Element => {
  const { procosysPlantId } = useFacility();

  const { getSystemsQuery } = proCoSysQueries;
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
      onClick={() => window.open(proCoSysUrls.getSystemUrl(system.procosysId), '_blank')}
      key={system.id}
    >
      <TextWrapper>
        <Link>
          {system.procosysCode} - {foundSystem?.Description}
        </Link>
      </TextWrapper>
    </Wrapper>
  );
};
