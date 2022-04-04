import { GroupBase, OptionsOrGroups, SingleValue } from 'react-select';
import { SearchableSingleSelect } from '../Inputs/SearchableSingleSelect';
import { TypedSelectOption } from '../../api/Search/searchType';
import { usePcsSearch } from '../../sHooks/search/usePcsSearch';

interface PCSLinkProps {
    person: TypedSelectOption | null;
    setPerson: React.Dispatch<React.SetStateAction<TypedSelectOption | null>>;
    isDisabled?: boolean;
}

export const PCSPersonSearch = ({ setPerson, isDisabled }: PCSLinkProps): JSX.Element => {
    const { searchPCS } = usePcsSearch();

    const loadOptions = async (
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        callback(await searchPCS(inputValue, 'person', signal));
    };

    return (
        <SearchableSingleSelect
            isDisabled={isDisabled}
            loadOptions={loadOptions}
            onChange={(newValue: SingleValue<TypedSelectOption>) => {
                setPerson(newValue ?? null);
            }}
        />
    );
};
