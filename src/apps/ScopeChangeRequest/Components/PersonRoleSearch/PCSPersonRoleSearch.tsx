import { SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';

import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../Inputs/SearchableDropdown/applyEds';
import { TypedSelectOption } from '../../api/Search/searchType';
import { sort } from '../../functions/sort';
import { useCancellationToken } from '../../../../hooks/cancellationToken/useCancellationToken';
import { usePcsSearch } from '../../hooks/Search/usePcsSearch';
import { useFacility } from '../../../../Core/Client/Hooks';
import { proCoSysQueries } from '../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { FunctionalRole } from '../../types/ProCoSys/functionalRole';

interface PCSLinkProps {
    onSelect: (selected?: TypedSelectOption | null) => void;
    isDisabled?: boolean;
    classification?: string;
}

export const PCSPersonRoleSearch = ({
    isDisabled,
    onSelect,
    classification,
}: PCSLinkProps): JSX.Element => {
    const { abort, getSignal } = useCancellationToken();
    const { procosysPlantId } = useFacility();
    const { searchPCS } = usePcsSearch({ functionalRoleClassification: classification });

    const { getFunctionalRolesQuery } = proCoSysQueries;

    const { data, refetch } = useQuery<unknown, unknown, FunctionalRole[]>(
        getFunctionalRolesQuery(procosysPlantId, classification)
    );

    const loadOptions = async (
        inputValue: string,
        callback: (options: TypedSelectOption[]) => void
    ) => {
        abort();
        const options: TypedSelectOption[] = [];

        await (await searchPCS(inputValue, 'person', getSignal())).forEach((x) => options.push(x));

        if (!data) {
            await refetch();
        }
        if (data) {
            const matches = data.filter((x) =>
                x.Code.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            matches.forEach((x) => {
                const selectOption: TypedSelectOption = {
                    label: x.Code,
                    value: x.Code,
                    object: x,
                    searchValue: x.Code,
                    type: 'functionalRole',
                };
                options.push(selectOption);
            });
        }
        const sorted = options.sort((a, b) => sort(a, b, inputValue));

        callback(sorted);
    };

    return (
        <>
            <div
                style={{
                    width: '-webkit-fill-available',
                    borderBottom: '5px solid #6F6F6F',
                    fontSize: '16px',
                }}
            >
                <AsyncSelect
                    cacheOptions={false}
                    loadOptions={loadOptions}
                    defaultOptions={false}
                    isDisabled={isDisabled}
                    styles={applyEdsStyles()}
                    controlShouldRenderValue={true}
                    components={{ ...applyEdsComponents() }}
                    placeholder={`Type to search..`}
                    noOptionsMessage={(obj: { inputValue: string }) => {
                        if (!obj.inputValue || obj.inputValue.length === 0) {
                            return <></>;
                        } else {
                            return <div>No results</div>;
                        }
                    }}
                    isClearable
                    onChange={(newValue: SingleValue<TypedSelectOption>) => {
                        onSelect(newValue ?? null);
                    }}
                    theme={(theme: Theme) => applyEDSTheme(theme)}
                />
            </div>
        </>
    );
};
