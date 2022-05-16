import { Button, Icon, SingleSelect, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../packages/Components/Icon';

import { TypedSelectOption } from '../../../ScopeChangeRequest/api/Search/searchType';
import { SearchReferences } from '../../../ScopeChangeRequest/Components/SearchReferences/SearchReferences';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';
import { FlexColumn, FormWrapper } from './releaseControlProcessForm.styles';

const { useAtomState, updateAtom } = DRCFormAtomApi;

const updateTitle = (e) => {
    updateAtom({ title: e.target.value });
};

const updateDescription = (e) => {
    updateAtom({ description: e.target.value });
};

const updateReferences = (newVals: TypedSelectOption[]) => {
    updateAtom({ references: newVals });
};

const updatePlannedStartDate = (e) => {
    updateAtom({ plannedStartDate: e.target.value });
};

export const ReleaseControlProcessForm = (): JSX.Element => {
    const {
        description,
        title,
        references = [],
        plannedStartDate,
    } = useAtomState(({ title, description, references, plannedStartDate }) => ({
        title,
        description,
        references,
        plannedStartDate,
    }));

    return (
        <>
            <div>
                <FormWrapper>
                    <FlexColumn>
                        General info
                        <TextField
                            id={(Math.random() * 16).toString()}
                            placeholder="This is a new flow"
                            label="Title /ID"
                            onChange={updateTitle}
                            value={title}
                            meta={'(Required)'}
                        />
                        <TextField
                            id={(Math.random() * 16).toString()}
                            label="Scope description"
                            multiline
                            rows={3}
                            placeholder="Why is this job needed, what is the size of the scope?"
                            value={description}
                            onChange={updateDescription}
                            meta={'(Required)'}
                        />
                        <TextField
                            type={'date'}
                            id="Planned start date"
                            meta={'(Required)'}
                            label="Planned start date"
                            onChange={updatePlannedStartDate}
                            value={plannedStartDate}
                        />
                    </FlexColumn>
                    <FlexColumn>
                        Workflow
                        <div style={{ fontWeight: 400, fontSize: '16px' }}>
                            Select a workflow to start with or create a complete custom flow.
                        </div>
                        <div>Insert custom select bar here...</div>
                        <WorkflowCustomEditor />
                    </FlexColumn>

                    <FlexColumn>
                        <SearchReferences onChange={updateReferences} references={references} />
                    </FlexColumn>
                </FormWrapper>
                <SubmitButtonBar />
            </div>
        </>
    );
};

const WorkflowCustomEditor = (): JSX.Element => {
    const [lines, setLines] = useState([]);

    return (
        <WorkflowWrapper>
            <WorkflowLine />
            <WorkflowLine />
            <WorkflowLine />
            <WorkflowLine />
            <WorkflowLine />
        </WorkflowWrapper>
    );
};

const WorkflowWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const stepNames = [
    'Demount Insulation',
    'Electric isolation',
    'Demount HT',
    'Demount valve',
    'Mount valve',
    'Bolt tensioning',
];

const responsibles = ['Iso', 'Electrical', 'Mechanical'];

const WorkflowLine = (): JSX.Element => {
    return (
        <Line>
            <Icon
                name="reorder"
                color={tokens.colors.interactive.primary__resting.hex}
                style={{ cursor: 'grab' }}
            />
            <SingleSelect items={stepNames} label="Step" />
            <SingleSelect items={responsibles} label="Responsible" />
            <ClickableIcon name="more_vertical" />
            <ClickableIcon name="close" />
        </Line>
    );
};

const Line = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    align-items: center;
`;

interface WorkflowStep {
    name: string;
}

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
