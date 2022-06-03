import { tokens } from '@equinor/eds-tokens';
import { useModelViewerContext, Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ElectroIcon } from '../../../../packages/ModelViewer/icons/ElectroIcon';
import { EleNetwork } from '../../Types/eleNetwork';
import { Pipetest } from '../../Types/pipetest';
import { getEleNetworks } from '../Electro/getEleNetworks';
import { ThreeDModel, WarningBanner, WarningBannerText } from '../Sidesheet/styles';

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
        selectTags(pipetest.lineNos);
    }, []);

    if (pipetest.lineNos.length > 0 && electroTags.length === 0)
        return (
            <WarningBanner>
                <WarningBannerText>No tags to display</WarningBannerText>
            </WarningBanner>
        );

    return (
        <ThreeDModel>
            <Viewer
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
                                        : pipetest.lineNos
                                );
                                return isElectro;
                            });
                        },
                    },
                ]}
            />
        </ThreeDModel>
    );
};
