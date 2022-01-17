import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchPcs } from '../../Api/Search/PCS/searchPcs';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

interface SelectOption {
    label: string;
    value: string;
}

interface PCSLinkProps {
    person: SelectOption | undefined;
    setPerson: React.Dispatch<React.SetStateAction<SelectOption | undefined>>;
}

export const PCSPersonSearch = ({ person, setPerson }: PCSLinkProps): JSX.Element => {
    const { procosys } = useApiClient();

    const loadOptions = async (inputValue: string, callback: (options: SelectOption[]) => void) => {
        callback(await searchPcs(inputValue, 'person', procosys));
    };

    return (
        <>
            <div style={{ width: '600px', borderBottom: '5px solid #6F6F6F', fontSize: '16px' }}>
                <AsyncSelect
                    cacheOptions={false}
                    loadOptions={loadOptions}
                    defaultOptions={false}
                    value={person}
                    styles={applyEdsStyles()}
                    controlShouldRenderValue={false}
                    components={{ ...applyEdsComponents(), DropdownIndicator: SearchIcon }}
                    placeholder={`Type to search..`}
                    noOptionsMessage={(obj: { inputValue: string }) => {
                        if (!obj.inputValue || obj.inputValue.length === 0) {
                            return <></>;
                        } else {
                            return <div>No results</div>;
                        }
                    }}
                    isClearable
                    onChange={(newValue: SingleValue<SelectOption>) => {
                        setPerson(newValue ?? undefined);
                    }}
                    theme={(theme: Theme) => applyEDSTheme(theme)}
                />
            </div>
        </>
    );
};

const SearchIcon = () => {
    return <Icon name="search" color={tokens.colors.interactive.focus.hex} />;
};
