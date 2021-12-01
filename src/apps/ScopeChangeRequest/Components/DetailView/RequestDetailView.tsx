import styled from 'styled-components';
import { Field } from './Components/Field';
import { ScopeChangeRequest } from '../../ScopeChangeRequestApp';
import { Attachments } from './Components/Attachments';
import { Documents } from './Components/Documents';
import { Tags } from './Components/Tags';
import { SectionRow } from './Styles/Section';
import { EditPenIcon } from './Styles/EditPen';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
}

export const RequestDetailView = ({ request }: RequestDetailViewProps): JSX.Element => {
    return (
        <div>
            <Header>
                <Title>Review scope change request </Title>
                <EditPenIcon />
            </Header>
            <FormContainer>
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

                <Field
                    customLabel={{ bold: true, fontSize: 'xx-large' }}
                    label={'Tags'}
                    value={<Tags tags={request.tags} />}
                />

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
            </FormContainer>
        </div>
    );
};

const Header = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.2em;
    align-items: center;
`;

const Title = styled.h2``;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
