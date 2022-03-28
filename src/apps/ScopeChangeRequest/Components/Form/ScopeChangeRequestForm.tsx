import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { TypedSelectOption } from '../../Api/Search/searchType';
import { Upload } from '../Attachments/Upload';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { usePreloadCaching } from '../../Hooks/React-Query/usePreloadCaching';
import { ScopeChangeFormState } from './useScopeChangeFormState';
import { ScopeChangeBaseForm } from './ScopeChangeBaseForm';
import { FlexColumn, FormWrapper, Section } from './ScopeChangeForm.styles';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
    formState: ScopeChangeFormState;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    formState,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const { handleInput, state } = formState;

    usePreloadCaching();

    const handleReferencesChanged = (references: TypedSelectOption[]) =>
        handleInput('references', references);

    const handleAttachmentsChanged = (attachments: File[]) =>
        handleInput('attachments', attachments);

    return (
        <div>
            <TitleHeader>
                <SidesheetTitle>Create scope change request</SidesheetTitle>
                <Icon
                    onClick={() => closeScrim()}
                    name="close"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </TitleHeader>

            <FormWrapper>
                <FlexColumn>
                    Request
                    <ScopeChangeBaseForm handleInput={handleInput} state={state} />
                </FlexColumn>

                <FlexColumn>
                    <Section>
                        <RelatedObjectsSearch
                            handleReferencesChanged={handleReferencesChanged}
                            references={state.references ?? []}
                        />
                    </Section>
                    Attachments
                    <Upload
                        attachments={state.attachments ?? []}
                        handleAttachmentsChanged={handleAttachmentsChanged}
                    />
                </FlexColumn>
            </FormWrapper>
        </div>
    );
};

export const SidesheetTitle = styled.span`
    font-size: 28px;
`;

export const Title = styled.div`
    line-height: 24px;
    font-size: 18px;
    color: black;
    font-weight: bold;
`;

const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0em;
`;
