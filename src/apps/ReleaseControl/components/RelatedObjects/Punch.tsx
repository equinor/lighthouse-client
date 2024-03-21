import { proCoSysUrls } from '@equinor/procosys-urls';
import { FAMQueries } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { ReleaseControlPunch } from '../../types/releaseControl';

import { Link, TextWrapper, Wrapper, MainText } from './WrapperStyles';

interface PunchProps {
  punchListItem: ReleaseControlPunch;
}

export interface PunchListItem {
  punchItemNo: number;
  description: string;
}

export const Punch = ({ punchListItem: { procosysId } }: PunchProps): JSX.Element => {
  const { getPunchListItemByNo } = FAMQueries;

  const { data } = useQuery<unknown, unknown, PunchListItem>(getPunchListItemByNo(procosysId));

  return (
    <Wrapper
      onClick={() => window.open(proCoSysUrls.getPunchUrl(procosysId), '_blank')}
      key={procosysId}
    >
      <TextWrapper>
        <MainText>
          <Link>{procosysId}</Link>- <div>{data?.description}</div>
        </MainText>
      </TextWrapper>
    </Wrapper>
  );
};
