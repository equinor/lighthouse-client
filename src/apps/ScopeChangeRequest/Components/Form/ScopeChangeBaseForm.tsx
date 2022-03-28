import { SingleSelect, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useRefresh } from '../../../../components/ParkView/hooks/useRefresh';

import { getCategories } from '../../Api/ScopeChange/getCategories';
import { getPhases } from '../../Api/ScopeChange/getPhases';
import { ScopeChangeBaseModel } from '../../Types/scopeChangeRequest';
import { Origin } from './Origin';

interface ScopeChangeBaseFormProps {
    state: Partial<ScopeChangeBaseModel>;
    handleInput: (key: keyof ScopeChangeBaseModel, value: unknown) => void;
}

export const ScopeChangeBaseForm = ({
    handleInput,
    state,
}: ScopeChangeBaseFormProps): JSX.Element => {
    const { data: phases } = useQuery(['phase'], getPhases, {
        cacheTime: Infinity,
    });
    const { data: categories } = useQuery(['category'], getCategories, {
        cacheTime: Infinity,
    });

    const forceRerender = useRefresh();

    return (
        <BaseFormContainer>
            <FormTextField
                label="Title"
                initialValue={state.title}
                required
                placeholder="Please add a title for the request"
                onChange={(e) => handleInput('title', e)}
            />

            <SingleSelect
                items={phases ?? []}
                label={'Phase'}
                meta="(Required)"
                initialSelectedItem={state.phase}
                placeholder="Select phase"
                handleSelectedItemChange={(change) => handleInput('phase', change.selectedItem)}
            />
            <Section>
                <SingleSelect
                    items={categories ?? []}
                    label={'Change category'}
                    meta="(Required)"
                    initialSelectedItem={state.category}
                    placeholder="Select category"
                    handleSelectedItemChange={(change) =>
                        handleInput('category', change.selectedItem)
                    }
                />
                <SingleSelect
                    items={['NCR', 'DCN', 'Punch', 'Query', 'SWCR', 'NotApplicable']}
                    label={'Change origin'}
                    meta="(Required)"
                    initialSelectedItem={state.originSource}
                    placeholder="Select origin"
                    handleSelectedItemChange={(change) => {
                        handleInput('originSource', change.selectedItem);
                        /** Must re-render for originSource to work */
                        forceRerender();
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

interface FormTextFieldProps {
    initialValue?: string;
    label?: string;
    multiline?: boolean;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    type?: React.HTMLInputTypeAttribute;
}
const FormTextField = ({
    initialValue,
    label,
    multiline,
    placeholder,
    required,
    onChange,
    type,
}: FormTextFieldProps) => {
    const [text, setText] = useState<string>(initialValue ?? '');

    return (
        <TextField
            id={Math.random().toString()}
            value={text}
            label={label}
            multiline={multiline}
            placeholder={placeholder}
            type={type}
            onInput={(e) => {
                setText(e.target.value);
                onChange && onChange(e.target.value);
            }}
            meta={required ? '(Required)' : ''}
        />
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
