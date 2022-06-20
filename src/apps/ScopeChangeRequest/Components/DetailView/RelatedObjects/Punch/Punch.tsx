import { useQuery } from 'react-query';

import { ScopeChangePunch } from '../../../../types/scopeChangeRequest';
import { Link, TextWrapper, Wrapper, MainText } from '../WrapperStyles';
import { FAMQueries } from '../../../../keys/FamQueries';
import { PunchListItem } from '../../../../types/FAM/punchListItem';
import { proCoSysUrls } from '../../../../../../packages/ProCoSysUrls/procosysUrl';

interface PunchProps {
    punch: ScopeChangePunch;
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
