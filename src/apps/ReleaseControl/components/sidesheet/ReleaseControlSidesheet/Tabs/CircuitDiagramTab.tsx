import { CircuitDiagram } from '@equinor/CircuitDiagram';
import { useWorkSpace } from '@equinor/WorkSpace';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';

export const CircuitDiagramTab = (): JSX.Element => {
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const { onGroupeSelect, onSelect } = useWorkSpace();

    return (
        <>
            {
                <CircuitDiagram
                    pipetest={null}
                    pipetests={[]}
                    width={window.innerWidth / 2}
                    circuitAndStarterTagNos={releaseControl.circuits}
                    onGroupeSelect={onGroupeSelect}
                    onSelect={onSelect}
                />
            }
        </>
    );
};
