import { Discipline } from '../../../../types/ProCoSys/discipline';
import { DisciplineGuesstimate } from '../../../../types/scopeChangeRequest';

export function generateSelectOptions(
    disciplines: Discipline[],
    guesstimates: DisciplineGuesstimate[]
): string[] {
    return (
        disciplines
            ?.filter(
                ({ Code }) =>
                    !guesstimates
                        .map(({ disciplineCode }) => extractDisciplineCodeFromlabel(disciplineCode))
                        .includes(Code)
            )
            .map(constructDisciplineLabel) ?? []
    );
}
export const constructDisciplineLabel = ({ Code, Description }: Discipline): string =>
    `${Code} - ${Description}`;

export const extractDisciplineCodeFromlabel = (label: string): string =>
    label.replace(' ', '').split('-')[0];
