import { Menu, Icon } from '@equinor/eds-core-react';
import { useLocationKey } from '@equinor/hooks';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState, useRef, useMemo } from 'react';
import { getApps } from '../../apps/apps';

export const HelpMenu = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    function giveFeedback() {
        window.open('https://forms.office.com/r/GzdEKzkXWY');
    }

    const locationName = useLocationKey();

    const helpPageUrl = useMemo(
        () => getApps().find(({ shortName }) => shortName === locationName)?.helpPageUrl,
        [locationName]
    );

    return (
        <div ref={ref}>
            <ClickableIcon name="help" onClick={() => setIsOpen(true)} />

            {isOpen && (
                <Menu
                    id="menu-complex"
                    aria-labelledby="anchor-complex"
                    open={isOpen}
                    anchorEl={ref.current}
                    onClose={() => setIsOpen(false)}
                    placement="bottom-end"
                >
                    <Menu.Item disabled={!helpPageUrl} onClick={() => window.open(helpPageUrl)}>
                        <Icon name="info_circle" /> App info
                    </Menu.Item>

                    <Menu.Section>
                        <Menu.Item disabled>
                            <Icon name="comment_more" /> Contact support
                        </Menu.Item>
                        <Menu.Item onClick={giveFeedback}>
                            <Icon name="thumbs_up_down" /> Give feedback
                        </Menu.Item>
                    </Menu.Section>
                </Menu>
            )}
        </div>
    );
};
