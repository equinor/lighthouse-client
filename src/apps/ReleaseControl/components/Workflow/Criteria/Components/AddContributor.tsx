import { Button } from '@equinor/eds-core-react';
import { Form, FormikValues } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { releaseControlMutationKeys } from '../../../../queries/releaseControlMutationKeys';
import { addContributor } from '../../../../api/releaseControl/Workflow';
import { useReleaseControlContext, useReleaseControlMutation } from '../../../../hooks';
import { PCSPersonSearch, TypedSelectOption } from '@equinor/Workflow';
import { FormContainer, TextField } from '../../../../../../packages/EdsForm';

interface AddContributorProps {
    readonly stepId: string;
    readonly close: () => void;
}

const validationSchema = object().shape({
    contributorTitle: string().max(2000, 'Maximum 2000 characters').required('(Required)'),
});

export const AddContributor = ({ close, stepId }: AddContributorProps): JSX.Element => {
    const [contributor, setContributor] = useState<TypedSelectOption | null>(null);

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

    const onSubmit = (values: FormikValues) => {
        mutate({
            azureOid: contributor?.value ?? '',
            requestId: id,
            stepId: stepId,
            contributorTitle: values.contributorTitle,
        });
    };

    return (
        <FormContainer
            initialValues={{}}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={onSubmit}
        >
            {({ isValid, submitForm }) => (
                <Form>
                    <Container>
                        <WorkflowIcon status="Active" />
                        <div style={{ width: '75%' }}>
                            <Section>
                                <Title>Contributor</Title>
                                <PCSPersonSearch person={contributor} setPerson={setContributor} />
                            </Section>
                            <Section>
                                <TextField
                                    id="contributorTitle"
                                    name="contributorTitle"
                                    label="Contribution"
                                    placeholder="Please add contribution title"
                                    multiline
                                />
                            </Section>
                            <ButtonContainer>
                                <Button disabled={!isValid || !contributor} onClick={submitForm}>
                                    Assign
                                </Button>
                                <Divider />
                                <Button variant="outlined" onClick={close}>
                                    Cancel
                                </Button>
                            </ButtonContainer>
                        </div>
                    </Container>
                </Form>
            )}
        </FormContainer>
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
    margin: 1rem 0.2rem;
    width: 100%;
`;
