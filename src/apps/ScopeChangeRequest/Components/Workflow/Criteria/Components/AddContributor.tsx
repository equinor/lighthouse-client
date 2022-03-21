import { useState } from 'react';
import styled from 'styled-components';

import { PCSPersonSearch } from '../../../SearchableDropdown/PCSPersonSearch';
import { addContributor } from '../../../../Api/ScopeChange/Workflow/addContributor';
import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { tokens } from '@equinor/eds-tokens';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { useScopeChangeMutation } from '../../../../Hooks/React-Query/useScopechangeMutation';
import { TypedSelectOption } from '../../../../Api/Search/searchType';
import { WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { scopeChangeMutationKeys } from '../../../../Keys/scopeChangeMutationKeys';

interface AddContributorProps {
    step: WorkflowStep;
    close: () => void;
}

export const AddContributor = ({ close, step }: AddContributorProps): JSX.Element => {
    const [contributor, setContributor] = useState<TypedSelectOption | null>(null);
    const [text, setText] = useState<string>('');
    const { request } = useScopeChangeContext();
    const { workflowKeys } = scopeChangeMutationKeys(request.id);

    const submit = async () => {
        await addContributor(
            contributor?.value ?? '',
            request.id,
            request.currentWorkflowStep?.id ?? '',
            text
        );
    };

    const { mutateAsync, isLoading } = useScopeChangeMutation(
        request.id,
        workflowKeys.addContributorKey(step.id),
        submit,
        {
            onSuccess: () => close(),
        }
    );

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
                        <Button
                            disabled={text.length === 0 || !contributor}
                            onClick={async () => await mutateAsync()}
                        >
                            Assign
                        </Button>
                        <Divider />
                        <Button variant="outlined" onClick={() => close()}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </div>
            </Container>
            {isLoading && <Progress.Dots color="primary" />}
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
