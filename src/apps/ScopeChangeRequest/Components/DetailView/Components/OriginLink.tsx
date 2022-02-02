import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';
import styled from 'styled-components';
import { isProduction } from '../../../../../Core/Client/Functions';
import { getDocumentIdByNo } from '../../../Api/PCS/getDocumentIdByNo';
import { OriginType } from '../../../Types/scopeChangeRequest';

interface OriginLinkProps {
    type: OriginType;
    id?: string;
}

export const OriginLink = ({ type, id }: OriginLinkProps): JSX.Element => {
    async function onClickRedirectOrigin(id: string) {
        const pcsId = await getDocumentIdByNo(id);
        window.open(
            `https://${isProduction() ? 'procosys' : 'procosystest'
            }.equinor.com/JOHAN_CASTBERG/Documents/Document#id=${pcsId}`
        );
    }

    const Component = useMemo(() => {
        switch (type) {
            case 'DCN': {
                if (!id) return <div>Error query without id</div>;
                return <Link onClick={() => onClickRedirectOrigin(id)}>{id}</Link>;
            }
            case 'NCR': {
                if (!id) return <div>Error query without id</div>;
                return <Link onClick={() => onClickRedirectOrigin(id)}>{id}</Link>;
            }
            case 'Query': {
                if (!id) return <div>Error query without id</div>;
                return <Link onClick={() => onClickRedirectOrigin(id)}>{id}</Link>;
            }
            case 'Punch': {
                if (!id) return <div>Error query without id</div>;
                return (
                    <Link
                        onClick={() =>
                            window.open(
                                `https://${isProduction() ? 'procosys' : 'procosystest'
                                }.equinor.com/JOHAN_CASTBERG/Completion#PunchListItem|${id}`
                            )
                        }
                    >
                        {id}
                    </Link>
                );
            }
            case 'SWCR': {
                if (!id) return <div>Error query without id</div>;
                return <Link onClick={() => onClickRedirectOrigin(id)}>{id}</Link>;
            }
            case 'NotApplicable': {
                return <div>Not applicable</div>;
            }
        }
    }, [type, id]);

    return <div>{Component}</div>;
};

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: underline;
    cursor: pointer;
`;
