import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { AppGroupe, AppManifest } from '@equinor/portal-client';
import { Link } from 'react-router-dom';

interface GroupComponentWrapperProps extends AppGroupe {
    links: AppManifest[];
    groupeId: string;
}

export function GroupComponentWrapper(group: GroupComponentWrapperProps): JSX.Element {
    return (
        <div>
            This is a AppGroupe
            <h2>{group.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {group.links.map((item) => {
                    const CustomIcon = item.icon;
                    return (
                        <div key={`group-link-${item.shortName}`}>
                            <Link className="link" to={`/${group.groupeId}/${item.shortName}`}>
                                {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}

                                {CustomIcon && typeof CustomIcon === 'string' && (
                                    <Icon
                                        name={CustomIcon}
                                        title={item.title}
                                        color={tokens.colors.text.static_icons__secondary.rgba}
                                    />
                                )}

                                {<span>{item.title}</span>}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
