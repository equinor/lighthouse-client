import { CircuitDiagram } from '@equinor/CircuitDiagram';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { getTagUrl } from '../../../../../../packages/CircuitDiagram/src/Api/getTagUrl';

export const CircuitDiagramTab = (): JSX.Element => {
  const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);

  return (
    <>
      {
        <CircuitDiagram
          sidesheetType="rc"
          onClickEntity={async (event) => {
            const url = await getTagUrl(event.tagNo, undefined);
            if (!url) return;
            window.open(url, '_blank');
            return;
          }}
          pipetest={null}
          pipetests={[]}
          width={window.innerWidth / 2}
          circuitAndStarterTagNos={releaseControl.circuits}
        />
      }
    </>
  );
};
