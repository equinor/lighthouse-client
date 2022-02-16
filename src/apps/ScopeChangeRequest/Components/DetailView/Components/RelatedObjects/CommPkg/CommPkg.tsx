import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { Icon } from '@equinor/eds-core-react';
import { CommissioningPackage } from '../../../../../Types/scopeChangeRequest';
import { useQuery } from 'react-query';
import { getCommPkgById } from '../../../../../Api/PCS/getCommPkgById';

interface CommPkgProps {
    commPkg: CommissioningPackage;
}

export const CommPkg = ({ commPkg }: CommPkgProps): JSX.Element => {
    const { data } = useQuery(
        ['commPkg', commPkg.procosysId, commPkg.procosysNumber],
        () => getCommPkgById(commPkg.procosysId),
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            retry: 0,
            retryDelay: Infinity,
        }
    );

    return (
        <Wrapper key={commPkg.procosysId}>
            <Icon name="placeholder_icon" />
            <TagText>
                <Link
                    href={`https://${isProduction() ? 'procosys' : 'procosystest'
                        }.equinor.com/JOHAN_CASTBERG/Completion#CommPkg|${commPkg.procosysId}`}
                    target="_blank"
                >
                    COMM_{commPkg.procosysNumber}
                </Link>
                -<div>{data?.Description}</div>
            </TagText>
        </Wrapper>
    );
};

const TagText = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2em;
`;

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
