import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/lighthouse-components';
import { useModelViewerContext, Viewer } from '@equinor/lighthouse-model-viewer';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { TagMap, TagOverlay } from '../../../../packages/ModelViewer/components/tagOverlay';
import { Pipetest } from '../../Types/pipetest';
import { MessageWrapper, ThreeDModel } from './3dViewStyles';
import { getIconName, getStatusColor, getTagOverlay as getElectroTagOverlay } from './Helpers';
import { ElectroIcon } from './icons/ElectroIcon';
import { EleNetwork, getEleNetworks } from '@equinor/CircuitDiagram';

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
    enabled: !!circuitStarterTagNos.length,
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

  const tagOverlay: TagMap = useMemo(() => getElectroTagOverlay(data), [data]);

  if (pipetest.lines?.length === 0 && electroTags.length === 0)
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
        tags={pipetest.lines?.map((x) => x.tagNo).flat()}
        echoPlantId={echoPlantId}
        padding={1}
        platformSectionId="Full-Pro"
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
                    ? [...electroTags, ...pipetest.lines?.map((x) => x.tagNo).flat()]
                    : pipetest.lines?.map((x) => x.tagNo).flat(),
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
          titleResolver={(item) => `${item.tagNo} - ${item.status}`}
        />
      </Viewer>
    </ThreeDModel>
  );
};
