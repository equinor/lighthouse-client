import React from 'react';
import { AnalyticsIcon } from '../../../../icons/Analytics';
import { BoardsIcon } from '../../../../icons/Board';
import { GantIcon } from '../../../../icons/Gant';
import { TableIcon } from '../../../../icons/TableIcon';
import { TreeIcon } from '../../../../icons/Tree';
import { AnalyticsTab } from './AnalyticsTab';
import { GardenTab } from './GardenTab';
import { ListTab as TableTab } from './ListTab';
import { PowerBiTab } from './PowerBiTab';
import { TimelineTab } from './TimeLineTAb';
import { TreeTab } from './TreeTab';
import { VisualEditorTab } from './VisualEditorTab';

export interface TabsConfigItem {
    title: string;
    icon: React.FC;
    viewComponent: React.FC;
}

const tabsConfig: TabsConfigItem[] = [
    {
        title: 'Tree',
        icon: TreeIcon,
        viewComponent: TreeTab,
    },
    {
        title: 'Table',
        icon: TableIcon,
        viewComponent: TableTab,
    },
    {
        title: 'Garden',
        icon: BoardsIcon,
        viewComponent: GardenTab,
    },
    {
        title: 'Timeline',
        icon: GantIcon,
        viewComponent: TimelineTab,
    },
    {
        title: 'Analytics',
        icon: AnalyticsIcon,
        viewComponent: AnalyticsTab,
    },
    {
        title: 'PowerBI',
        //Todo add PowerBI icon
        icon: AnalyticsIcon,
        viewComponent: PowerBiTab,
    },
    {
        title: 'Editor',
        //Todo add Editor icon
        icon: GantIcon,
        viewComponent: VisualEditorTab,
    },
];

interface ActiveTabs {
    tabs: TabsConfigItem[];
    viewIsActive: boolean;
}

function getTabConfig(tabsConfig: TabsConfigItem[]) {
    return function useConfiguredTabs<Config extends Record<string, unknown>>(
        tree?: Config,
        list?: Config,
        garden?: Config,
        timeline?: Config,
        analytics?: Config,
        powerBI?: Config,
        editor?: Config
    ): ActiveTabs {
        const tabs = tabsConfig.filter((item) => {
            if (tree && item.title === 'Tree') return true;
            if (list && item.title === 'Table') return true;
            if (garden && item.title === 'Garden') return true;
            if (timeline && item.title === 'Timeline') return true;
            if (analytics && item.title === 'Analytics') return true;
            if (powerBI && item.title === 'PowerBI') return true;
            if (editor && item.title === 'Editor') return true;
            return false;
        });
        return {
            tabs,
            viewIsActive: tabs.length > 0,
        };
    };
}

export const useConfiguredTabs = getTabConfig(tabsConfig);
