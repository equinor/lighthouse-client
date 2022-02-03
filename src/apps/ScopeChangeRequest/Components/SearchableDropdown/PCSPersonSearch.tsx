import { SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchPcs } from '../../Api/Search/PCS/searchPcs';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';

interface SelectOption {
    label: string;
    value: string;
}

interface PCSLinkProps {
    person: SelectOption | null;
    setPerson: React.Dispatch<React.SetStateAction<SelectOption | null>>;
    isDisabled?: boolean;
}

export const PCSPersonSearch = ({ person, setPerson, isDisabled }: PCSLinkProps): JSX.Element => {
    const loadOptions = async (inputValue: string, callback: (options: SelectOption[]) => void) => {
        callback(await searchPcs(inputValue, 'person'));
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
                    value={person}
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
                    onChange={(newValue: SingleValue<SelectOption>) => {
                        setPerson(newValue ?? null);
                    }}
                    theme={(theme: Theme) => applyEDSTheme(theme)}
                />
            </div>
        </>
    );
};
