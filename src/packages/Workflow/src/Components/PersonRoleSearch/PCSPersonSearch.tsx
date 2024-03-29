import { SearchableSingleSelect } from '@equinor/Workflow';
import { GroupBase, OptionsOrGroups, SingleValue } from 'react-select';
import { TypedSelectOption } from './typedSelectOption';
import { usePcsPersonRoleSearch } from './usePcsPersonRoleSearch';

interface PCSLinkProps {
  person: TypedSelectOption | null;
  setPerson: React.Dispatch<React.SetStateAction<TypedSelectOption | null>>;
  isDisabled?: boolean;
}

export const PCSPersonSearch = ({ setPerson, isDisabled }: PCSLinkProps): JSX.Element => {
  const { searchPCS } = usePcsPersonRoleSearch();

  const loadOptions = async (
    inputValue: string,
    signal: AbortSignal,
    callback: (options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>) => void
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
