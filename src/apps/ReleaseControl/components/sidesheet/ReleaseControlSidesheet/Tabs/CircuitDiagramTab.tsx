import { CircuitDiagram } from '@equinor/CircuitDiagram';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';

export const CircuitDiagramTab = (): JSX.Element => {
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);

    return (
        <>
            {
                <CircuitDiagram
                    pipetest={null}
                    pipetests={[]}
                    width={window.innerWidth / 2}
                    circuitAndStarterTagNos={releaseControl.circuits}
                />
            }
        </>
    );
};
