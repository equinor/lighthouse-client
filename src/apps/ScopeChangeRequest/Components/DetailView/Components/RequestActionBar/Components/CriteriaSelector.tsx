import Select, { SingleValue } from 'react-select';
import { applyEDSTheme } from '../../../../SearchableDropdown/applyEds';
import { useScopeChangeAccessContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Field } from '../../Field';

interface SelectOption {
    label: string;
    value: string;
}

interface CriteriaSelectorProps {
    setSelected: (value: string | undefined) => void;
}

export function CriteriaSelector({ setSelected }: CriteriaSelectorProps): JSX.Element {
    const { signableCriterias } = useScopeChangeAccessContext();

    return (
        <div>
            {signableCriterias &&
                signableCriterias?.filter((x) => x.signedState === null).length > 1 && (
                    <Field
                        label="Select criteria to sign"
                        value={
                            <div style={{ width: '630px' }}>
                                <Select
                                    isClearable={true}
                                    isSearchable={false}
                                    controlShouldRenderValue
                                    options={signableCriterias.map((x): SelectOption => {
                                        return { label: x.value, value: x.id };
                                    })}
                                    onChange={(newValue: SingleValue<SelectOption>) => {
                                        setSelected(newValue?.value);
                                    }}
                                    theme={applyEDSTheme}
                                />
                            </div>
                        }
                    />
                )}
        </div>
    );
}
