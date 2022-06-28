import { useQuery } from 'react-query';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { FAMQueries } from '../../../ScopeChangeRequest/keys/FamQueries';
import { ReleaseControlPunch } from '../../types/releaseControl';

import { Link, TextWrapper, Wrapper, MainText } from './WrapperStyles';

interface PunchProps {
    punch: ReleaseControlPunch;
}

export interface PunchListItem {
    punchItemNo: number;
    description: string;
}

export const Punch = ({ punch: { procosysId } }: PunchProps): JSX.Element => {
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
