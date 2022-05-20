import { deref } from '@dbeining/react-atom';
import { Chip } from '@equinor/eds-core-react';
import { useFilterApiContext } from '@equinor/filter';
import { useWorkSpace } from '@equinor/WorkSpace';
import styled from 'styled-components';
import { useLocationContext } from '../../Context/LocationProvider';
import { gardenApiAtom } from '../../Util/bookmarks/gardenBookmarks/gardenApiAtom';
import { TabButton } from '../ToggleButton';

export function Presets(): JSX.Element {
    const { presetOptions } = useWorkSpace();

    const { activeTab } = useLocationContext();
    const {
        operations: { setFilterState },
    } = useFilterApiContext();

    function handleClick(presetName: string) {
        const preset = presetOptions?.find(({ name }) => name === presetName);
        if (!preset) return;

        setFilterState(preset.filter.filterGroups);

        switch (preset.type) {
            case 'garden': {
                const gardenApi = deref(gardenApiAtom);
                gardenApi?.mutations.setGardenKey(preset.garden.gardenKey);
                gardenApi?.mutations.setGroupKeys(preset.garden.groupByKeys ?? []);
                preset.garden.customGroupByKeys &&
                    gardenApi?.mutations.setCustomGroupKeys(preset.garden.customGroupByKeys);
                break;
            }

            case 'table': {
                break;
            }
        }
    }

    return (
        <>
            {presetOptions
                ?.filter(({ type }) => type === activeTab)
                .map((x) => (
                    <TabButton
                        aria-selected={false}
                        onClick={() => handleClick(x.name)}
                        key={x.name}
                        width="80px"
                    >
                        <PresetChip>{x.name}</PresetChip>
                    </TabButton>
                ))}
        </>
    );
}

const PresetChip = styled(Chip)`
    z-index: auto;
`;
