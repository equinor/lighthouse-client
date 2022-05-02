import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';

import styled from 'styled-components';
import { getDocumentById } from '../../api/STID/getDocumentById';
import { transformIsoDate } from '../Workflow/Utils/dateFormatting';
import { useInfiniteCachedQuery } from '../../../../hooks/useInfiniteCachedQuery';
import { stidQueryKeys } from '../../keys/STIDQueryKeys';

interface StidDocumentProps {
    docNo: string;
}

export const StidDocument = ({ docNo }: StidDocumentProps): JSX.Element => {
    const handleRedirect = (docNo: string) => {
        window.open(`https://lci.equinor.com/JCA/doc?docNo=${docNo}`);
    };
    const { document } = stidQueryKeys();

    const { data } = useInfiniteCachedQuery(document(docNo), () => getDocumentById(docNo, 'JCA'));

    return (
        <Wrapper>
            <IconWrapper>
                <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.rgba} />
            </IconWrapper>
            <Inline>
                <LineBreaks
                    style={{
                        fontSize: '16px',
                        color: `${tokens.colors.interactive.primary__resting.rgba}`,
                    }}
                >
                    <Link onClick={() => handleRedirect(docNo)}>
                        <Details>
                            {docNo} - {data?.docTitle}
                        </Details>
                    </Link>
                    <Inline>
                        <MetaData>
                            {`Revision ${data?.currentRevision.revNo ?? ''
                                } | Rev date ${transformIsoDate(data?.currentRevision.revDate)} ${data?.currentRevision.reasonForIssue
                                    ? `| Reason for issue ${data?.currentRevision.reasonForIssue}`
                                    : ''
                                } `}
                        </MetaData>
                    </Inline>
                </LineBreaks>
            </Inline>
        </Wrapper>
    );
};

const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
`;

const LineBreaks = styled.div`
    display: flex;
    flex-direction: column;
`;

const Details = styled.div`
    max-width: 500px;
    font-size: 16px;
    text-overflow: ellipsis;
`;

const MetaData = styled.div`
    font-size: 10px;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 650px;
    padding: 0.2em 0em;
    gap: 0.5em;
`;

const Link = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
