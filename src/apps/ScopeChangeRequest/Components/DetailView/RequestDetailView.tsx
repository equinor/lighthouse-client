import styled from 'styled-components';
import { Field } from './Components/Field';
import { Attachments } from './Components/Attachments';
import { Documents } from './Components/Documents';
import { Tags } from './Components/Tags';
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
                </SectionRow>
                <Field label={'Description'} value={request.description} />

                <Field label={'Tags'} value={<Tags tags={request.tags} />} />

                <Field
                    customLabel={{ bold: true, fontSize: 'xx-large' }}
                    label={'Documents'}
                    value={<Documents documents={request.documents} />}
                />

                <Field
                    customLabel={{ bold: true, fontSize: 'xx-large' }}
                    label={'Attachments'}
                    value={<Attachments />}
                />

                <Field
                    customLabel={{ bold: true, fontSize: 'xx-large' }}
                    label={'Workflow'}
                    value={'No workflow linked'}
                />
            </DetailViewContainer>
        </div>
    );
};

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
