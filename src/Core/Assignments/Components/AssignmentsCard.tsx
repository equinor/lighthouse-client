import { deref } from '@dbeining/react-atom';
import { AppManifest } from '@equinor/portal-client';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router';
import { getApps } from '../../../apps/apps';
import { CoreContext } from '../../WorkSpace/src/WorkSpaceApi/workspaceState';
import { ClickableIcon } from '../../../packages/Components/Icon';
import { useLocationKey } from '../../../packages/Filter/Hooks/useLocationKey';
import { Assignment } from '../Types/assignment';
import {
    DetailText,
    DueDate,
    LeftSection,
    NotificationTitle,
    RightSection,
    Wrapper,
} from './assignmentCard.styles';

interface AssignmentCardProps {
    assignment: Assignment;
}

export const AssignmentCard = ({ assignment }: AssignmentCardProps): JSX.Element => {
    const isToday =
        new Date().toLocaleDateString() === assignment.dueDate &&
        new Date(assignment.dueDate).toLocaleDateString();

    const navigate = useNavigate();
    //HACK: Doesnt scale
    const apps = new Map<string, string>();
    apps.set('ScopeChangeControl', 'change');
    const currentLocation = useLocationKey();

    async function handleNotificationClick(appName: string, identifier: string): Promise<void> {
        const actualName = apps.get(appName);
        if (!actualName) throw 'App not found';
        const app = getApps().find(({ shortName }) => shortName === actualName);
        if (!app) throw 'Not found';
        if (currentLocation === actualName) {
            //mount sidesheet
            await openSidesheet(identifier, app);
        } else {
            //HACK: table injected in url
            navigate(`${app.groupe}/${app.shortName}/table#${app.shortName}/${identifier}`);
        }
    }

    async function openSidesheet(identifier: string, app: AppManifest) {
        const { idResolver, onSelect } = deref(CoreContext)[app.shortName];

        const item = idResolver && (await idResolver(identifier));
        if (!item) return;

        onSelect && onSelect(item);
    }

    return (
        <Wrapper>
            <LeftSection>
                {/* TODO: resolve EDS colors */}
                <svg
                    width={15}
                    height={15}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="6" cy="6" r="5.5" fill={'#B276B2'} />
                </svg>
                <DetailText>
                    <NotificationTitle>{assignment.title}</NotificationTitle>
                </DetailText>
            </LeftSection>
            <RightSection>
                {assignment.dueDate && (
                    <DueDate overdue={new Date() > new Date(assignment.dueDate)}>
                        {isToday
                            ? 'Due today'
                            : `Due ${DateTime.fromJSDate(new Date(assignment.dueDate)).toRelative({
                                unit: 'days',
                            })}`}
                    </DueDate>
                )}
            </RightSection>
            <div>
                <ClickableIcon
                    name="chevron_right"
                    onClick={() =>
                        handleNotificationClick(
                            assignment.sourceSystem.subSystem,
                            assignment.sourceSystem.identifier
                        )
                    }
                />
            </div>
        </Wrapper>
    );
};
