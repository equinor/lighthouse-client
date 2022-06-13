import { tokens } from '@equinor/eds-tokens';

import { getDocumentById } from '../../api/STID/getDocumentById';
import { transformIsoDate } from '../Workflow/Utils/dateFormatting';
import { stidQueryKeys } from '../../keys/STIDQueryKeys';
import { useInfiniteCachedQuery } from '@equinor/hooks';
import { Wrapper, Inline, LineBreaks, Details, MetaData, Link } from './stidDocument.styles';

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
        <Wrapper onClick={() => handleRedirect(docNo)}>
            <Inline>
                <LineBreaks
                    style={{
                        fontSize: '16px',
                        color: `${tokens.colors.interactive.primary__resting.rgba}`,
                    }}
                >
                    <Link>
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
