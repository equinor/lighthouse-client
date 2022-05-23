import { useState } from 'react';
import styled from 'styled-components';

import { Button, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { releaseControlMutationKeys } from '../../../../queries/releaseControlMutationKeys';
import { addContributor } from '../../../../api/releaseControl/Workflow';
import { PCSPersonSearch } from '../../../../../ScopeChangeRequest/Components/PersonRoleSearch/PCSPersonSearch';
import { useReleaseControlMutation } from '../../../../hooks/useReleaseControlMutation';

interface AddContributorProps {
    stepId: string;
    close: () => void;
}

export const AddContributor = ({ close, stepId }: AddContributorProps): JSX.Element => {
    const [contributor, setContributor] = useState<TypedSelectOption | null>(null);
    const [text, setText] = useState<string>('');
    const id = useReleaseControlContext(({ releaseControl }) => releaseControl.id);
    const { workflowKeys } = releaseControlMutationKeys(id);

    const { mutate } = useReleaseControlMutation(
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
