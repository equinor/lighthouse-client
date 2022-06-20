import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '@equinor/sidesheet';
import { MenuItem } from '@equinor/overlay-menu';
import { Pipetest } from '../../Types/pipetest';
import { isProduction } from '@equinor/lighthouse-portal-client';

export function useSidesheetEffects(actions: SidesheetApi, item: Pipetest): void {
    const makeMenuItems = () => {
        const menuItems: MenuItem[] = [];

        const url = `https://procosys.equinor.com/JOHAN_CASTBERG/Completion#McPkg|${item.mcPkgId}`;

        const procosysUrl = isProduction() ? url : url.replace('procosys', 'procosystest');

        menuItems.push({
            label: 'Open in ProCoSys',
            onClick: () => {
                const w = window.open(procosysUrl, '_blank');
                if (w) {
                    w.focus();
                }
            },
            icon: (
                <Icon
                    size={24}
                    color={tokens.colors.interactive.primary__resting.hex}
                    name="external_link"
                />
            ),
        });
        return menuItems;
    };

    useEffect(() => {
        actions.setMenuItems(makeMenuItems());
    }, [item.mcPkgId]);

    useEffect(() => {
        actions.setTitle(`Pipetest ${item.name} - ${item.description}`);
    }, [item.name, item.description]);

    const width = window.innerWidth / 2;

    useEffect(() => {
        actions.setWidth(width);
    }, [width]);
}
