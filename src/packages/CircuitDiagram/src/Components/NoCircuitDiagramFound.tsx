interface NoCircuitDiagramFoundProps {
    htCable: boolean;
    releaseControl: boolean;
}
export const NoCircuitDiagramFound = ({
    htCable,
    releaseControl,
}: NoCircuitDiagramFoundProps): JSX.Element => {
    return (
        <>
            {releaseControl ? (
                <h3 style={{ marginLeft: '8px' }}>
                    No circuit diagram found for this release control
                </h3>
            ) : htCable ? (
                <h3 style={{ marginLeft: '8px' }}>
                    No circuit diagram found for this heat tracing cable
                </h3>
            ) : (
                <h3 style={{ marginLeft: '8px' }}>No circuit diagram found for this pipetest</h3>
            )}
        </>
    );
};
