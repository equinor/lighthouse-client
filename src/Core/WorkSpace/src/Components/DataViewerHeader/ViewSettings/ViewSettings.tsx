import { Icon, Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState, useRef, useMemo } from 'react';

import { useLocationContext } from '../../../Context/LocationProvider';
import { TabsConfigItem } from '../../../Util/tabsConfig';
import { TabButton } from '../../ToggleButton';

interface ViewSettingsProps {
    tabs: TabsConfigItem[];
}
export const ViewSettings = ({ tabs }: ViewSettingsProps): JSX.Element | null => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTab } = useLocationContext();
    const ref = useRef<HTMLDivElement>(null);
    /** Find viewSettings for the current tab */
    const ViewComp = useMemo(
        () => tabs.find((s) => s.tabId === activeTab)?.viewSettings,
        [activeTab, tabs]
    );

    if (!ViewComp) return null;

    return (
        <div ref={ref}>
            <TabButton
                color={tokens.colors.interactive.primary__resting.hex}
                aria-selected={isOpen}
                onClick={() => setIsOpen(true)}
            >
                <Icon name="settings" />
            </TabButton>
            {isOpen && (
                <Popover
                    open={isOpen}
                    anchorEl={ref.current}
                    placement="bottom"
                    onClose={() => setIsOpen(false)}
                    id="viewsettings-workspace-dropdown"
                >
                    {/* Decision, what styling should go where, strict or loose parent? */}
                    <div style={{ overflow: 'hidden' }}>
                        <ViewComp />
                    </div>
                </Popover>
            )}
        </div>
    );
};
