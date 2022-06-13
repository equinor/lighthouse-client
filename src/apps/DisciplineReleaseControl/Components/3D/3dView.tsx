import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/lighthouse-components';
import { useModelViewerContext, Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { TagMap, TagOverlay } from '../../../../packages/ModelViewer/components/tagOverlay';
import { EleNetwork } from '../../Types/eleNetwork';
import { Pipetest } from '../../Types/pipetest';
import { getEleNetworks } from '../Electro/getEleNetworks';
import { MessageWrapper, ThreeDModel } from './3dViewStyles';
import { ElectroIcon } from './icons/ElectroIcon';

interface I3DViewProp {
    pipetest: Pipetest;
}

export const ThreeDView = ({ pipetest }: I3DViewProp): JSX.Element => {
    const { echoPlantId } = useFacility();
    const [isElectro, setIsElectro] = useState(false);

    const circuitStarterTagNosArray = pipetest.circuits.map((c) => c.circuitAndStarterTagNo);
    const circuitStarterTagNos = circuitStarterTagNosArray.toString();

    const { data } = useQuery([circuitStarterTagNos], () => getEleNetworks(circuitStarterTagNos), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const electroTags = useMemo(
        () => data?.map((eN: EleNetwork) => eN.checkLists.map((cl) => cl.tagNo)).flat() || [],
        [data]
    );

    const { selectTags } = useModelViewerContext();

    useEffect(() => {
        setIsElectro(false);
    }, [pipetest.name]);

    const tagOverlay: TagMap = useMemo(() => {
        const overlay: TagMap = {};

        data?.forEach((eleNetwork: EleNetwork) => {
            eleNetwork.checkLists.forEach((checkList) => {
                overlay[checkList.tagNo] = {
                    tagNo: checkList.tagNo,
                    type:
                        checkList.tagNo === eleNetwork.switchBoardTagNo
                            ? 'LINE'
                            : eleNetwork.circuits.find((i) => i.tagNo === checkList.tagNo)
                                  ?.eleSymbolCode || 'unknown',
                    status: checkList.status,
                };
            });
        });

        return overlay;
    }, [data]);

    if (pipetest.lineNos.length === 0 && electroTags.length === 0)
        return (
            <MessageWrapper>
                <Icon
                    name={'warning_outlined'}
                    color={tokens.colors.interactive.warning__resting.rgba}
                    size={48}
                />
                <h2>No tags found for this pipetest</h2>
            </MessageWrapper>
        );

    return (
        <ThreeDModel>
            <Viewer
                tags={pipetest.lineNos}
                echoPlantId={echoPlantId}
                padding={1}
                selectionActions={[
                    {
                        title: 'Toggle Electro',
                        disabled: electroTags.length === 0,
                        icon: () => (
                            <ElectroIcon
                                color={
                                    isElectro
                                        ? tokens.colors.interactive.primary__resting.rgba
                                        : tokens.colors.text.static_icons__default.rgba
                                }
                            />
                        ),
                        onClick: () => {
                            setIsElectro((isElectro) => {
                                isElectro = !isElectro;
                                selectTags(
                                    isElectro
                                        ? [...electroTags, ...pipetest.lineNos]
                                        : pipetest.lineNos,
                                    {
                                        skipLoadingUi: true,
                                    }
                                );
                                return isElectro;
                            });
                        },
                    },
                ]}
            >
                <TagOverlay
                    tagOverlay={tagOverlay}
                    iconResolver={getIconName}
                    statusResolver={getStatusColor}
                />
            </Viewer>
        </ThreeDModel>
    );
};
function getIconName(type: string) {
    switch (type) {
        case 'K_BOX':
            return 'circuit';
        case 'TAVLE':
            return 'junction_box';
        case 'LINE':
            return 'cable';
        case 'HT_KAB':
            return 'heat_trace';
        default:
            return 'tag';
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case 'OK':
            return tokens.colors.interactive.secondary__resting.rgba;
        case 'OS':
            return tokens.colors.ui.background__medium.rgba;
        case 'PA':
            return tokens.colors.interactive.danger__resting.rgba;
        case 'PB':
            return tokens.colors.interactive.warning__resting.rgba;
        default:
            return tokens.colors.interactive.primary__resting.rgba;
    }
}
