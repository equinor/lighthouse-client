import styled from 'styled-components';
import { Field } from './Components/Field';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
}

export const RequestDetailView = ({ request }: RequestDetailViewProps): JSX.Element => {
    return (
        <div>
            <DetailViewContainer>
                <Field label={'Title'} value={request.title} />
                <SectionRow>
                    <Field label={'Phase'} value={request.phase} />
                    <Field label={'Status'} value={request.state} />
                </SectionRow>
                <SectionRow>
                    <Field label={'Change category'} value={request.category} />
                    <Field label={'Change origin'} value={request.origin} />
                    {/* <Field label={'Change origin'} value={request.origin} /> */}
                </SectionRow>
                <Field label={'Description'} value={request.description} />
            </DetailViewContainer>
        </div>
    );
};

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
