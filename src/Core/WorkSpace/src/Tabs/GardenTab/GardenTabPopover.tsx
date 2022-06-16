import { Button, Popover, SingleSelect } from '@equinor/eds-core-react';
import { tabApis } from '../../Context/LocationProvider';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';

export const GardenTabPopover = (): JSX.Element | null => {
    const gardenApi = tabApis.useAtomState()?.garden;
    const { gardenOptions } = useWorkSpace();

    if (!gardenApi || !gardenOptions) return null;

    const keys = Object.keys(gardenOptions.fieldSettings ?? {});

    const currentlyGroupedKeys = gardenApi.states.getCurrentGroupByKeys();
    const gardenKey = gardenApi.states.getGardenKey();

    const getAvailableKeys = () =>
        keys.filter((s) => !currentlyGroupedKeys.includes(s) && s !== gardenKey);

    const { setGroupKeys, setGardenKey } = gardenApi.mutations;

    const resetState = () => {
        setGardenKey(gardenOptions.gardenKey);
        setGroupKeys(gardenOptions.groupByKeys ?? []);
    };

    return (
        <>
            <Popover.Title>Garden settings</Popover.Title>
            <Popover.Content
                style={{
                    height: '670px',
                    width: '370px',
                    paddingBottom: '10px',
                    overflowY: 'scroll',
                }}
            >
                <Button variant="ghost_icon" onClick={resetState}>
                    Reset
                </Button>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8em',
                        padding: '20px 0em',
                    }}
                >
                    <SingleSelect
                        selectedOption={gardenKey}
                        items={keys}
                        handleSelectedItemChange={(e) => {
                            if (!e.selectedItem) return;
                            setGardenKey(e.selectedItem);
                        }}
                        label={'Column headers'}
                    />
                    <SingleSelect
                        items={keys.filter((s) => gardenKey !== s)}
                        label={'Group by'}
                        selectedOption={currentlyGroupedKeys[0]}
                        handleSelectedItemChange={(e) => {
                            if (!e.selectedItem) {
                                setGroupKeys([]);
                                return;
                            }
                            setGroupKeys([e.selectedItem]);
                        }}
                    />
                    {currentlyGroupedKeys.map(
                        (s, i) =>
                            i !== 0 && (
                                <SingleSelect
                                    items={getAvailableKeys()}
                                    selectedOption={s}
                                    handleSelectedItemChange={(e) => {
                                        if (!e.selectedItem) {
                                            setGroupKeys(currentlyGroupedKeys.slice(0, i));
                                            return;
                                        }
                                        setGroupKeys([
                                            ...currentlyGroupedKeys.slice(0, i),
                                            e.selectedItem,
                                        ]);
                                    }}
                                    label="Then group by"
                                    key={i + (s ?? '')}
                                />
                            )
                    )}
                    {getAvailableKeys().length > 0 && (
                        <SingleSelect
                            items={getAvailableKeys()}
                            handleSelectedItemChange={(e) => {
                                if (!e.selectedItem) return;
                                setGroupKeys([...currentlyGroupedKeys, e.selectedItem]);
                            }}
                            label="Then group by"
                        />
                    )}
                </div>
            </Popover.Content>
        </>
    );
};
