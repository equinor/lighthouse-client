import { useState } from 'react';

import { PCSPersonSearch } from '../../../../../PersonRoleSearch/PCSPersonSearch';
import { addContributor } from '../../../../../../api/ScopeChange/Workflow/addContributor';
import { Button, Divider, Progress, TextField } from '@equinor/eds-core-react';
import { useScopeChangeContext } from '../../../../../../context/useScopeChangeAccessContext';
import { WorkflowIcon } from '../../../../Components/WorkflowIcon';
import { useScopeChangeMutation } from '../../../../../../hooks/React-Query/useScopechangeMutation';
import { TypedSelectOption } from '../../../../../../api/Search/searchType';
import { WorkflowStep } from '../../../../../../types/scopeChangeRequest';
import { scopeChangeMutationKeys } from '../../../../../../keys/scopeChangeMutationKeys';
import { ButtonContainer, Container, Section, Title } from './addContributor.styles';

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

    const { mutate, isLoading } = useScopeChangeMutation(
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
                            onClick={() => mutate()}
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
