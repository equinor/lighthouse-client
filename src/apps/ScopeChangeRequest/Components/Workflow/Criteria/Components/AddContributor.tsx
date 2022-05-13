import { useState } from 'react';
import styled from 'styled-components';

import { PCSPersonSearch } from '../../../PersonRoleSearch/PCSPersonSearch';
import { addContributor } from '../../../../api/ScopeChange/Workflow/addContributor';
import { Button, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { useScopeChangeMutation } from '../../../../hooks/React-Query/useScopechangeMutation';
import { TypedSelectOption } from '../../../../api/Search/searchType';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { scopeChangeMutationKeys } from '../../../../keys/scopeChangeMutationKeys';

interface AddContributorProps {
    stepId: string;
    close: () => void;
}

export const AddContributor = ({ close, stepId }: AddContributorProps): JSX.Element => {
    const [contributor, setContributor] = useState<TypedSelectOption | null>(null);
    const [text, setText] = useState<string>('');
    const id = useScopeChangeContext((s) => s.request.id);
    const { workflowKeys } = scopeChangeMutationKeys(id);

    const { mutate } = useScopeChangeMutation(
        id,
        workflowKeys.addContributorKey(stepId),
        addContributor,
        {
            onSuccess: () => close(),
        }
    );

    const handleSubmit = () =>
        mutate({
            azureOid: contributor?.value ?? '',
            requestId: id,
            stepId: stepId,
            contributorTitle: text,
        });

    return (
        <>
            <Container>
                <WorkflowIcon status={'Active'} />
                <div style={{ width: '75%' }}>
                    <Section>
                        <Title>Contributor</Title>
                        <PCSPersonSearch person={contributor} setPerson={setContributor} />
                    </Section>
                    <Section>
                        <Title>Contribution</Title>
                        <TextField
                            id={'addcontributor'}
                            placeholder={'Please add contribution title'}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                    </Section>
                    <ButtonContainer>
                        <Button disabled={text.length === 0 || !contributor} onClick={handleSubmit}>
                            Assign
                        </Button>
                        <Divider />
                        <Button variant="outlined" onClick={close}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </div>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0em 2em;
`;

const Title = styled.div`
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

const Divider = styled.div`
    width: 0.5rem;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
`;

const Section = styled.div`
    display: flex;
    gap: 0.6em;
    flex-direction: column;
    margin: 0.2rem;
    width: 100%;
`;
