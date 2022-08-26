import { useAtom } from '@dbeining/react-atom';
import { createAtom } from '@equinor/atom';
import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import styled from 'styled-components';
import {
    disableEditMode,
    sideSheetEditModeAtom,
    toggleEditMode,
} from '../../../Atoms/editModeAtom';
import { FamTag, ReleaseControl } from '../../../types/releaseControl';
import { ScopeTab } from './Tabs/ScopeTab';
import { HistoryTab } from './Tabs/HistoryTab';
import { updateContext } from './updateContext';
import { WorkflowTab } from './Tabs/WorkflowTab';
import { ReleaseControlSidesheetBanner } from './ReleaseControlSidesheetBanner';
import { EditWorkflowTab } from './EditTabs/EditWorkflowTab';
import { EditScopeTab } from './EditTabs/EditScopeTab';
import { TypedSelectOption } from '../../../../ScopeChangeRequest/api/Search/searchType';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import {
    getReleaseControlSnapshot,
    useGetReleaseControl,
    useReleaseControlAccess,
    useReleaseControlContext,
    useReleaseControlMutationWatcher,
    useSidesheetEffects,
    useUnpackReferences,
} from '../../../hooks';
import { useEdsTabs } from '../../../../../hooks/edsTabs/useEdsTabs';

interface ReleaseControlSidesheetProps {
    item: ReleaseControl;
    actions: SidesheetApi;
}
export const ReleaseControlSidesheet = ({
    actions,
    item,
}: ReleaseControlSidesheetProps): JSX.Element => {
    useReleaseControlMutationWatcher(item.id);
    useGetReleaseControl(item.id, item);
    useReleaseControlAccess(item.id);
    useSidesheetEffects(actions, toggleEditMode, item.id);

    const { activeTab, handleChange } = useEdsTabs();
    const releaseControl = useReleaseControlContext(({ releaseControl }) => releaseControl);
    const { clearState, updateAtom } = DRCFormAtomApi;

    updateAtom({
        ...releaseControl,
        documentNumbers: releaseControl?.documents?.map((document) => document.id),
        punchListItemIds: releaseControl?.punchListItems?.map((punchListItem) => punchListItem.id),
        tags: releaseControl?.scopeTags?.map(
            (famTag: FamTag): TypedSelectOption => ({
                label: `${famTag.tagNo}`,
                value: famTag.tagNo,
                type: 'famtag',
                searchValue: famTag.tagNo,
                object: famTag,
            })
        ),
        htCables: releaseControl?.scopeHTTags?.map(
            (famTag: FamTag): TypedSelectOption => ({
                label: `${famTag.tagNo}`,
                value: famTag.tagNo,
                type: 'htcable',
                searchValue: famTag.tagNo,
                object: famTag,
            })
        ),
    });

    const editMode = useAtom(sideSheetEditModeAtom);
    useEffect(() => {
        disableEditMode();
        clearState();
        updateContext(item, actions);
    }, [item?.id]);

    useUnpackReferences({ releaseControl });

    if (Object.keys(getReleaseControlSnapshot().releaseControl).length < 2) {
        return <></>;
    }
    return (
        <Wrapper>
            <ReleaseControlSidesheetBanner></ReleaseControlSidesheetBanner>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <HeaderTab>Scope</HeaderTab>
                    <HeaderTab>Workflow</HeaderTab>
                    <HeaderTab>History</HeaderTab>
                </SidesheetTabList>
                <TabList>
                    <Tab>{editMode ? <EditScopeTab /> : <ScopeTab />}</Tab>
                    <Tab>{editMode ? <EditWorkflowTab /> : <WorkflowTab />}</Tab>
                    <Tab>
                        <HistoryTab />
                    </Tab>
                </TabList>
            </Tabs>
        </Wrapper>
    );
};

const HeaderTab = styled(Tabs.Tab)``;
export const relaseControlSidesheetContext = createAtom({});
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: scroll;
    height: 100%;
`;
