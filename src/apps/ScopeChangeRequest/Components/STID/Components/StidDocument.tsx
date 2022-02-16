import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';

import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getDocumentById } from '../../../Api/STID/getDocumentById';
import { QueryKeys } from '../../../Api/ScopeChange/queryKeys';

interface StidDocumentProps {
    docNo: string;
}

export const StidDocument = ({ docNo }: StidDocumentProps): JSX.Element => {
    const handleRedirect = (docNo: string) => {
        window.open(`https://lci.equinor.com/JCA/doc?docNo=${docNo}`);
    };

    const { data } = useQuery(
        [QueryKeys.Document, `${docNo}`],
        () => getDocumentById(docNo, 'JCA'),
        {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    function transformIsoDate(date: string | undefined) {
        if (!date) return '-';
        return new Date(date).toISOString().slice(0, 10);
    }

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
                            {`Revision ${data?.currentRevision.revNo} | Rev date ${transformIsoDate(
                                data?.revDate
                            )} | Reason for issue ${data?.reasonForIssue}`}
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
