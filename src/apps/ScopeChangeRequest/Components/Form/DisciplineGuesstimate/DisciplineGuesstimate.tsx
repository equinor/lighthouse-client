import { Button, SingleSelect, TextField } from '@equinor/eds-core-react';
import { useFacility } from '@equinor/portal-client';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { ClickableIcon } from '../../../../../packages/Components/Icon';
import { ProCoSysQueries } from '../../../keys/ProCoSysQueries';
import { Discipline } from '../../../types/ProCoSys/discipline';
import { DisciplineGuesstimate } from '../../../types/scopeChangeRequest';
import { ButtonContainer } from '../ScopeChangeForm.styles';
import { GuesstimateList } from './disciplineGuesstimate.styles';
import {
    extractDisciplineCodeFromlabel,
    generateSelectOptions,
} from './Utils/generateSelectOptions';

const Guesstimate = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 2fr 0.2fr;
    align-items: center;
    gap: 1em;
`;
interface GuesstimateDisciplineProps {
    state: DisciplineGuesstimate[];
    updateFormValue: (guesses: DisciplineGuesstimate[]) => void;
}

export const GuesstimateDiscipline = ({
    state,
    updateFormValue,
}: GuesstimateDisciplineProps): JSX.Element => {
    const [guesstimates, setGuesstimates] = useState<DisciplineGuesstimate[]>(
        state.length > 0 ? state : [{ guesstimateHours: NaN, disciplineCode: '' }]
    );

    const { procosysPlantId } = useFacility();
    const { getDisciplinesQuery } = ProCoSysQueries;
    const { data: disciplines } = useQuery<unknown, unknown, Discipline[]>(
        getDisciplinesQuery(procosysPlantId)
    );

    const appendGuesstimate = () =>
        setGuesstimates((old) => [...old, { disciplineCode: '', guesstimateHours: null }]);
    const handleRemove = (index: number) =>
        setGuesstimates((old) => old.filter((_, i) => i !== index));
    const handleChange = (index: number, guess: DisciplineGuesstimate) =>
        setGuesstimates((old) => [...old.slice(0, index), guess, ...old.slice(index + 1)]);

    useEffect(() => {
        updateFormValue(
            guesstimates.map(({ guesstimateHours, disciplineCode }) => ({
                guesstimateHours,
                disciplineCode: extractDisciplineCodeFromlabel(disciplineCode),
            }))
        );
    }, [guesstimates]);

    return (
        <>
            <GuesstimateList>
                {guesstimates?.map(({ guesstimateHours, disciplineCode }, index) => (
                    <GuesstimateGuesser
                        handleClear={() => handleRemove(index)}
                        key={index}
                        handleChange={(guess) => handleChange(index, guess)}
                        guesstimate={guesstimateHours}
                        disciplineName={disciplineCode}
                        selectOptions={generateSelectOptions(disciplines ?? [], guesstimates)}
                    />
                ))}
                <ButtonContainer>
                    <Button variant="outlined" onClick={appendGuesstimate}>
                        Add
                    </Button>
                </ButtonContainer>
            </GuesstimateList>
        </>
    );
};

interface GuesstimateGuesserProps {
    disciplineName?: string;
    guesstimate?: number | null;
    handleChange: (guess: DisciplineGuesstimate) => void;
    handleClear: () => void;
    selectOptions: string[];
}

export const GuesstimateGuesser = ({
    guesstimate,
    disciplineName,
    handleChange,
    handleClear,
    selectOptions,
}: GuesstimateGuesserProps): JSX.Element => {
    return (
        <Guesstimate>
            <SingleSelect
                items={selectOptions}
                value={disciplineName}
                label={'Disciplines'}
                handleSelectedItemChange={({ selectedItem }) =>
                    selectedItem &&
                    handleChange({
                        guesstimateHours: guesstimate ?? NaN,
                        disciplineCode: selectedItem,
                    })
                }
            />
            <TextField
                id="guesstimate"
                type={'number'}
                label="Guesstimate Mhrs"
                value={guesstimate?.toString()}
                onChange={(e) =>
                    handleChange({
                        guesstimateHours: e.target.valueAsNumber,
                        disciplineCode: disciplineName ?? '',
                    })
                }
            />

            <ClickableIcon name="clear" onClick={handleClear} />
        </Guesstimate>
    );
};
