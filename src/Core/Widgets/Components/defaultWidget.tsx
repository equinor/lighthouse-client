import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';

export const DefaultWidget = ({ actions }: { actions: SidesheetApi }): JSX.Element => {
    useEffect(() => {
        actions.setTitle('Default sidesheet!');
        window['setTitle'] = actions.setTitle;
    }, []);

    return (
        <div>
            <p>This is a demo sidesheet widget</p>
        </div>
    );
};

window['DefaultWidget'] = DefaultWidget;
