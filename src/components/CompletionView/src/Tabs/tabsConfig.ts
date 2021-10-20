import React from 'react';
import { AnalyticsIcon } from '../../../../icons/Analytics';
import { BoardsIcon } from '../../../../icons/Board';
import { GantIcon } from '../../../../icons/Gant';
import { ListIcon } from '../../../../icons/List';
import { TreeIcon } from '../../../../icons/Tree';
import { AnalyticsTab } from './AnalyticsTab';
import { GardenTab } from './GardenTab';
import { ListTab } from './ListTab';
import { TimelineTab } from './TimeLineTAb';
import { TreeTab } from './TreeTab';

interface TabsConfigItem {
    title: string;
    icon: React.FC;
    viewComponent: React.FC;
}

export const tabsConfig: TabsConfigItem[] = [
    {
        title: 'Tree',
        icon: TreeIcon,
        viewComponent: TreeTab
    },
    {
        title: 'List',
        icon: ListIcon,
        viewComponent: ListTab
    },
    {
        title: 'Garden',
        icon: BoardsIcon,
        viewComponent: GardenTab
    },
    {
        title: 'Timeline',
        icon: GantIcon,
        viewComponent: TimelineTab
    },
    {
        title: 'Analytics',
        icon: AnalyticsIcon,
        viewComponent: AnalyticsTab
    }
];
