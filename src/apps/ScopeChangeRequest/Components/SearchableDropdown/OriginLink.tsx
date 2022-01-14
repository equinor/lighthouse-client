import styled from 'styled-components';
import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { SingleValue, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { searchPcs } from '../../Api/PCS/searchPcs';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';

interface SelectOption {
    label: string;
    value: string;
}

interface PCSLinkProps {
    originId: SelectOption | undefined;
    setOriginId: React.Dispatch<React.SetStateAction<SelectOption | undefined>>;
    originType: string | undefined;
}

export const OriginLink = ({ originId, setOriginId, originType }: PCSLinkProps): JSX.Element => {
    const { procosys } = useApiClient();

    const loadOptions = async (inputValue: string, callback: (options: SelectOption[]) => void) => {
        if (!originType) return;
        callback(await searchPcs(inputValue, originType, procosys));
    };

    return (
        <>
            <Inline>
                <div
                    style={{ width: '300px', borderBottom: '5px solid #6F6F6F', fontSize: '16px' }}
                >
                    <AsyncSelect
                        cacheOptions={false}
                        isDisabled={!originType}
                        loadOptions={loadOptions}
                        defaultOptions={false}
                        value={originId}
                        styles={applyEdsStyles()}
                        components={applyEdsComponents()}
                        placeholder={`Type to search..`}
                        noOptionsMessage={(obj: { inputValue: string }) => {
                            if (!obj.inputValue || obj.inputValue.length === 0) {
                                return <></>;
                            } else {
                                return <div>No results</div>;
                            }
                        }}
                        isClearable
                        //controlShouldRenderValue={false}
                        onChange={(newValue: SingleValue<SelectOption>) => {
                            setOriginId(newValue ?? undefined);
                        }}
                        theme={(theme: Theme) => applyEDSTheme(theme)}
                    />
                </div>
            </Inline>
        </>
    );
};

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;
