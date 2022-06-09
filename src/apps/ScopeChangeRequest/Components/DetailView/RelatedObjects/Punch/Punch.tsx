import { useQuery } from 'react-query';
import { isProduction } from '@equinor/lighthouse-portal-client';

import { ScopeChangePunch } from '../../../../types/scopeChangeRequest';
import { Link, TextWrapper, Wrapper, MainText } from '../WrapperStyles';
import { FAMQueries } from '../../../../keys/FamQueries';
import { PunchListItem } from '../../../../types/FAM/punchListItem';

interface PunchProps {
    punch: ScopeChangePunch;
}

export const Punch = ({ punch: { procosysId } }: PunchProps): JSX.Element => {
    const { getPunchListItemByNo } = FAMQueries;

    const { data } = useQuery<unknown, unknown, PunchListItem>(getPunchListItemByNo(procosysId));

    return (
        <Wrapper
            onClick={() =>
                window.open(
                    `https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#PunchListItem|${procosysId}`,
                    '_blank'
                )
            }
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
