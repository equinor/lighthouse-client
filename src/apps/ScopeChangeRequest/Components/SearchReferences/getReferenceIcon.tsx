import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ReferenceType } from '../../hooks/Search/useReferencesSearch';
import { CommPkgIcon } from '../DetailView/RelatedObjects/CommPkg/commPkgIcon';

const DEFAULT_COLOR = tokens.colors.interactive.primary__resting.hex;

export function getReferenceIcon(type: ReferenceType): JSX.Element | null {
    switch (type) {
        case 'area':
            return <Icon name="pin_drop" color={DEFAULT_COLOR} />;

        case 'discipline':
            return <Icon name="school" color={DEFAULT_COLOR} />;

        case 'document':
            return <Icon name="file_copy" color={DEFAULT_COLOR} />;

        case 'tag':
            return <Icon name="tag" color={DEFAULT_COLOR} />;

        case 'commpkg':
            return <CommPkgIcon />;

        case 'system':
            return <Icon name="folder" color={DEFAULT_COLOR} />;

        default:
            return <Icon name="placeholder_icon" color={DEFAULT_COLOR} />;
    }
}
