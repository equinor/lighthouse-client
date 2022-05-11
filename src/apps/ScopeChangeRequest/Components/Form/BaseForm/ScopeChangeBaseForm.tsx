import { SingleSelect } from '@equinor/eds-core-react';
import styled from 'styled-components';

import { FormTextField } from '../../Inputs/FormTextField';
import { Origin } from '../Origin';
import { ScopeChangeFormModel } from '../../../hooks/form/useScopeChangeFormState';
import { IsWarrantyCaseCheckbox } from '../IsWarrantyCheckbox/IsWarrantyCheckbox';

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
            <CheckboxWrapper>
                <IsWarrantyCaseCheckbox
                    initialValue={state.potentialWarrantyCase}
                    handleInput={(newVal) => handleInput('potentialWarrantyCase', newVal)}
                />
            </CheckboxWrapper>
        </BaseFormContainer>
    );
};

const CheckboxWrapper = styled.div`
    margin-left: -14px;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    display: flex;
    align-items: center;
`;

const BaseFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-end;
`;
