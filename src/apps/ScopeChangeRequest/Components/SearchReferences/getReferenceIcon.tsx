import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ReferenceType } from '../../hooks/Search/useReferencesSearch';
import { CommPkgIcon } from '../DetailView/RelatedObjects/CommPkg/commPkgIcon';

export function getReferenceIcon(type: ReferenceType): JSX.Element | null {
    switch (type) {
        case 'area':
            return <Icon name="pin_drop" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'discipline':
            return <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'document':
            return <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'tag':
            return <Icon name="tag" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'commpkg':
            return <CommPkgIcon />;

        default:
            return (
                <Icon
                    name="placeholder_icon"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            );
    }
}
