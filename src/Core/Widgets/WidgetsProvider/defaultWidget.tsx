export const DemoSidesheetWidget = (): JSX.Element => (
    <div>
        <h2>Demo!</h2>
        <p>This is a simple demo sidesheet widget.</p>
    </div>
);

export const DefaultWidget = ({ widgetId }: { widgetId: string }): JSX.Element => (
    <div>
        <h2>Unknown Widget</h2>
        <p>No widget registered with id: {widgetId}.</p>
    </div>
);
