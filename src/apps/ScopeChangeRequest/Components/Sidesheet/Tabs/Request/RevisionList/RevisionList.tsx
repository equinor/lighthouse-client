import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { openNewScopeChange } from '../../../../../functions/openNewScopeChange';
import { useScopeChangeContext } from '../../../../../hooks/context/useScopeChangeContext';
import { MetaData } from '../../../../SearchReferences/searchReferences.styles';

export const RevisionsList = (): JSX.Element => {
    const revisions = useScopeChangeContext((s) => s.request.revisions);

    return (
        <RevisionWrapper>
            {revisions.map(({ id, isVoided, revisionNumber, sequenceNumber, state, title }) => (
                <RevisionText key={sequenceNumber}>
                    <Link onClick={() => openNewScopeChange(id)}>
                        {sequenceNumber}
                        {revisionNumber && `-${revisionNumber}`}, {title}
                    </Link>
                    <MetaData>
                        {state}, {isVoided ? 'Voided' : 'Not voided'}
                    </MetaData>
                </RevisionText>
            ))}
        </RevisionWrapper>
    );
};

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: 'none';
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const RevisionText = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
`;

const RevisionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
