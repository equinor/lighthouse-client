import { Button, SingleSelect, TextField } from '@equinor/eds-core-react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useFacility } from '../../../../../Core/Client/Hooks';
import { ClickableIcon } from '../../../../../packages/Components/Icon';
import { ProCoSysQueries } from '../../../keys/ProCoSysQueries';
import { Discipline } from '../../../types/ProCoSys/discipline';
import { DisciplineGuesstimate } from '../../../types/scopeChangeRequest';

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
        state.length > 0 ? state : [{ guesstimateHours: NaN, procosysCode: '' }]
    );

    const { procosysPlantId } = useFacility();
    const { getDisciplinesQuery } = ProCoSysQueries;
    const { data: disciplines } = useQuery<unknown, unknown, Discipline[]>(
        getDisciplinesQuery(procosysPlantId)
    );

    const appendGuesstimate = () =>
        setGuesstimates((old) => [...old, { procosysCode: '', guesstimateHours: null }]);
    const handleRemove = (index: number) =>
        setGuesstimates((old) => old.filter((_, i) => i !== index));
    const handleChange = (index: number, guess: DisciplineGuesstimate) =>
        setGuesstimates((old) => [...old.slice(0, index), guess, ...old.slice(index + 1)]);

    useEffect(() => {
        updateFormValue(
            guesstimates.map(({ guesstimateHours, procosysCode }) => ({
                guesstimateHours,
                procosysCode: extractDisciplineCodeFromlabel(procosysCode),
            }))
        );
    }, [guesstimates]);

    function generateSelectOptions() {
        return (
            disciplines
                ?.filter(
                    ({ Code }) =>
                        !guesstimates
                            .map(({ procosysCode }) => extractDisciplineCodeFromlabel(procosysCode))
                            .includes(Code)
                )
                .map(constructDisciplineLabel) ?? []
        );
    }

    return (
        <>
            <GuesstimateList>
                {guesstimates?.map(({ guesstimateHours, procosysCode }, index) => (
                    <GuesstimateGuesser
                        handleClear={() => handleRemove(index)}
                        key={index}
                        handleChange={(guess) => handleChange(index, guess)}
                        guesstimate={guesstimateHours}
                        disciplineName={procosysCode}
                        selectOptions={generateSelectOptions()}
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

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

const GuesstimateList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

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
                        procosysCode: selectedItem,
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
                        procosysCode: disciplineName ?? '',
                    })
                }
            />

            <ClickableIcon name="clear" onClick={handleClear} />
        </Guesstimate>
    );
};

const constructDisciplineLabel = ({ Code, Description }: Discipline) => `${Code} - ${Description}`;

const extractDisciplineCodeFromlabel = (label: string) => label.replace(' ', '').split('-')[0];
