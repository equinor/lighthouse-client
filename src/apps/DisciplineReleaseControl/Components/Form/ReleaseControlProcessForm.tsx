import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { DRCFormAtomApi } from '../../Atoms/formAtomApi';
import { TitleInput, DescriptionInput, PlannedStartDateInput, ReferencesInput } from './Inputs';
import { FlexColumn, FormWrapper } from './releaseControlProcessForm.styles';

export const ReleaseControlProcessForm = (): JSX.Element => {
    return (
        <>
            <div>
                <FormWrapper>
                    <FlexColumn>
                        General info
                        <TitleInput />
                        <DescriptionInput />
                        <PlannedStartDateInput />
                    </FlexColumn>
                    <FlexColumn>
                        Workflow
                        <div style={{ fontWeight: 400, fontSize: '16px' }}>
                            Select a workflow to start with or create a complete custom flow.
                        </div>
                        <div>Insert custom select bar here...</div>
                    </FlexColumn>

                    <FlexColumn>
                        <ReferencesInput />
                    </FlexColumn>
                </FormWrapper>
                <SubmitButtonBar />
            </div>
        </>
    );
};

export const SubmitButtonBar = (): JSX.Element => {
    const { useIsValid, readAtomValue } = DRCFormAtomApi;

    const isValid = useIsValid();

    return (
        <ActionBar>
            <ButtonContainer>
                <Button disabled={!isValid} onClick={() => console.log(readAtomValue())}>
                    Submit
                </Button>
                <Button disabled={!isValid} variant="outlined">
                    Save
                </Button>
            </ButtonContainer>
        </ActionBar>
    );
};

export const ButtonContainer = styled.div`
    flex-direction: row;
    gap: 0.5em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1em;
`;

export const ActionBar = styled.div`
    height: 64px;
    width: 100%;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    background-color: white;
`;
