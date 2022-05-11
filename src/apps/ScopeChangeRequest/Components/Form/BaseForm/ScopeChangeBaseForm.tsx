import { SingleSelect } from '@equinor/eds-core-react';
import styled from 'styled-components';

import { FormTextField } from '../../Inputs/FormTextField';
import { Origin } from '../Origin';
import { ScopeChangeFormModel } from '../../../hooks/form/useScopeChangeFormState';

interface ScopeChangeBaseFormProps {
    state: Partial<ScopeChangeFormModel>;
    handleInput: (key: keyof ScopeChangeFormModel, value: unknown) => void;
    shouldDisableCategory?: boolean;
}

export const ScopeChangeBaseForm = ({
    handleInput,
    state,
}: ScopeChangeBaseFormProps): JSX.Element => {
    return (
        <BaseFormContainer>
            <FormTextField
                label="Title"
                initialValue={state.title}
                required
                placeholder="Please add a title for the request"
                onChange={(change) => handleInput('title', change)}
            />

            <Section>
                <SingleSelect
                    items={['NCR', 'Punch', 'Query', /**'SWCR',**/ 'NotApplicable', 'DCR']}
                    label={'Change origin'}
                    meta="(Required)"
                    initialSelectedItem={state.originSource}
                    placeholder="Select origin"
                    handleSelectedItemChange={(change) => {
                        handleInput('originSource', change.selectedItem);
                    }}
                />
                <Origin
                    originSource={{
                        handleOriginSourceChange: (e) => handleInput('originSource', e),
                        originSource: state.originSource,
                    }}
                    originId={{
                        handleOriginIdChange: (e) => handleInput('originSourceId', e),
                        originId: state.originSourceId,
                    }}
                />
            </Section>
            <FormTextField
                multiline
                label="Scope description"
                placeholder="Please add description"
                required
                initialValue={state.description}
                onChange={(value) => handleInput('description', value)}
            />

            <Guesstimate>
                <FormTextField
                    label="Guess direct Mhrs"
                    type={'number'}
                    onChange={(value) => handleInput('guesstimateHours', Number(value))}
                    placeholder="Make your best guess.."
                    initialValue={state.guesstimateHours?.toString()}
                />

                <FormTextField
                    label="Guesstimate description"
                    placeholder="Please add description"
                    onChange={(e) => handleInput('guesstimateDescription', e)}
                    initialValue={state.guesstimateDescription}
                />
            </Guesstimate>
        </BaseFormContainer>
    );
};

const BaseFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const Guesstimate = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1em;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-end;
`;
