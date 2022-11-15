import { useCancellationToken } from '@equinor/hooks';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { FunctionalRole, ProCoSysQueries } from '@equinor/Workflow';
import { TypedSelectOption } from './typedSelectOption';
import { useQuery } from 'react-query';
import { usePcsSearch } from './usePcsSeach';
import { sort } from './sort';
import { applyEDSTheme, applyEdsStyles, applyEdsComponents } from './applyEds';

interface PCSLinkProps {
    onSelect: (selected?: TypedSelectOption | null) => void;
    isDisabled?: boolean;
    classification?: string;
    value?: string;
    defaultResult?: FunctionalRole[];
}

export const PCSPersonRoleSearch = ({
    isDisabled,
    onSelect,
    classification,
    value,
    defaultResult,
}: PCSLinkProps): JSX.Element => {
    const { abort, getSignal } = useCancellationToken();
    const { procosysPlantId } = useFacility();
    const { searchPCS } = usePcsSearch({ functionalRoleClassification: classification });

    const { getFunctionalRolesQuery } = ProCoSysQueries;

    const { data, refetch } = useQuery<unknown, unknown, FunctionalRole[]>(
        getFunctionalRolesQuery(procosysPlantId, classification)
    );

    const defaultOptions: TypedSelectOption[] = [];
    defaultResult?.forEach((option) => {
        const selectOption: TypedSelectOption = {
            label: option.Code,
            value: option.Code,
            object: option,
            searchValue: option.Code,
            type: 'functionalRole',
        };
        defaultOptions.push(selectOption);
    });

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
            const matches = data.filter(
                (x) =>
                    x.Code.toLowerCase().startsWith(inputValue.toLowerCase()) ||
                    x.Code.toLowerCase().includes(inputValue.toLowerCase())
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
                    defaultInputValue={value !== '' && value !== undefined ? value : undefined}
                    cacheOptions={false}
                    loadOptions={loadOptions}
                    defaultOptions={defaultOptions.length !== 0 ? defaultOptions : undefined}
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
