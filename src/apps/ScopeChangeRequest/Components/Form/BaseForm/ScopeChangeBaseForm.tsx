import { Button, SingleSelect, TextField } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { scopeChangeQueries } from '../../../keys/queries';
import { FormTextField } from '../../Inputs/FormTextField';
import { Origin } from '../Origin';
import { ScopeChangeFormModel } from '../../../hooks/form/useScopeChangeFormState';
import { ProCoSysQueries } from '../../../keys/ProCoSysQueries';
import { useFacility } from '../../../../../Core/Client/Hooks';
import { useEffect, useState } from 'react';
import { Discipline } from '../../../types/ProCoSys/discipline';
import { ClickableIcon } from '../../../../../packages/Components/Icon';

interface ScopeChangeBaseFormProps {
    state: Partial<ScopeChangeFormModel>;
    handleInput: (key: keyof ScopeChangeFormModel, value: unknown) => void;
    shouldDisableCategory?: boolean;
}

export const ScopeChangeBaseForm = ({
    handleInput,
    state,
    shouldDisableCategory,
}: ScopeChangeBaseFormProps): JSX.Element => {
    const { phaseQuery, categoryQuery } = scopeChangeQueries;
    const { data: phases } = useQuery(phaseQuery);
    const { data: categories } = useQuery(categoryQuery);

    return (
        <BaseFormContainer>
            <FormTextField
                label="Title"
                initialValue={state.title}
                required
                placeholder="Please add a title for the request"
                onChange={(change) => handleInput('title', change)}
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
                    items={categories?.map(({ name }) => name) ?? []}
                    label={'Change category'}
                    meta="(Required)"
                    initialSelectedItem={state.changeCategory?.name}
                    placeholder="Select category"
                    disabled={shouldDisableCategory}
                    handleSelectedItemChange={(change) =>
                        handleInput(
                            'changeCategory',
                            categories?.find(({ name }) => name === change.selectedItem)
                        )
                    }
                />
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

            <div>
                <GuesstimateDiscipline />
            </div>

            {/* <Guesstimate>
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
            </Guesstimate> */}
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
    grid-template-columns: 1.5fr 2fr 1fr;
    align-items: center;
    gap: 1em;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-end;
`;

interface GuesstimateGuess {
    disciplineName: string;
    guesstimate: number;
}

export const GuesstimateDiscipline = (): JSX.Element => {
    const [guesstimates, setGuesstimates] = useState<GuesstimateGuess[]>([]);
    const appendGuesstimate = () =>
        setGuesstimates((old) => [...old, { disciplineName: '', guesstimate: 0 }]);

    const handleRemove = (index: number) =>
        setGuesstimates((old) => old.filter((_, i) => i !== index));

    const handleChange = (index: number, guess: GuesstimateGuess) =>
        setGuesstimates((old) => [...old.slice(0, index), guess, ...old.slice(index + 1)]);

    useEffect(() => {
        console.log(guesstimates);
    }, [guesstimates]);

    return (
        <>
            {guesstimates?.map(({ disciplineName, guesstimate }, index) => (
                <GuesstimateGuesser
                    handleClear={() => handleRemove(index)}
                    key={index}
                    handleChange={(guess) => handleChange(index, guess)}
                    guesstimate={guesstimate}
                    disciplineName={disciplineName}
                />
            ))}
            <Button onClick={appendGuesstimate}>Add</Button>
        </>
    );
};

interface GuesstimateGuesserProps {
    disciplineName?: string;
    guesstimate?: number;
    handleChange: (guess: GuesstimateGuess) => void;
    handleClear: () => void;
}

export const GuesstimateGuesser = ({
    guesstimate,
    disciplineName,
    handleChange,
    handleClear,
}: GuesstimateGuesserProps): JSX.Element => {
    const { procosysPlantId } = useFacility();
    const { getDisciplinesQuery } = ProCoSysQueries;
    const { data: disciplines } = useQuery<unknown, unknown, Discipline[]>(
        getDisciplinesQuery(procosysPlantId)
    );

    return (
        <Guesstimate>
            <SingleSelect
                items={
                    disciplines?.map(({ Code, Description }) => `${Code} - ${Description}`) ?? []
                }
                value={disciplineName}
                label={'Disciplines'}
                handleSelectedItemChange={({ selectedItem }) =>
                    selectedItem &&
                    handleChange({ guesstimate: guesstimate ?? 0, disciplineName: selectedItem })
                }
            />
            <TextField
                id="guesstimate"
                type={'number'}
                label="Guesstimate Mhrs"
                value={guesstimate?.toString()}
                onChange={(e) =>
                    handleChange({
                        guesstimate: Number(e.target.value) ?? 0,
                        disciplineName: disciplineName ?? '',
                    })
                }
            />

            <ClickableIcon name="clear" onClick={handleClear} />
        </Guesstimate>
    );
};
