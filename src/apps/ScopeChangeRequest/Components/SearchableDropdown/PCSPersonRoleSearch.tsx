import { SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchPcs } from '../../Api/Search/PCS/searchPcs';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';
import { useRef } from 'react';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { useQuery } from 'react-query';
import { QueryKeys } from '../../Api/ScopeChange/queryKeys';
import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { sort } from '../../Functions/sort';

interface PCSLinkProps {
    selected: TypedSelectOption | null;
    setSelected: React.Dispatch<React.SetStateAction<TypedSelectOption | null>>;
    isDisabled?: boolean;
}

export const PCSPersonRoleSearch = ({
    selected,
    setSelected,
    isDisabled,
}: PCSLinkProps): JSX.Element => {
    const controller = useRef(new AbortController());

    const { data } = useQuery([QueryKeys.FunctionalRole], getFunctionalRoles, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const loadOptions = async (
        inputValue: string,
        callback: (options: TypedSelectOption[]) => void
    ) => {
        controller.current.abort();
        controller.current = new AbortController();
        const options: TypedSelectOption[] = [];

        await (
            await searchPcs(inputValue, 'person', controller.current.signal)
        ).forEach((x) => options.push(x));

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
                    value={selected}
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
                        setSelected(newValue ?? null);
                    }}
                    theme={(theme: Theme) => applyEDSTheme(theme)}
                />
            </div>
        </>
    );
};
