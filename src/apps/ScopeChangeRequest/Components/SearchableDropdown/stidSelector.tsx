import React, { Fragment, useState } from 'react';
import { Button, Icon, Scrim } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PCSLink } from './PCSLink';
import { TypedSelectOption } from '../../Api/Search/searchType';

export const StidSelector = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);

    return (
        <Fragment>
            <Button
                onClick={() => {
                    setIsOpen((prev) => !prev);
                }}
            >
                Add document
            </Button>
            {isOpen && (
                <Scrim
                    isDismissable={false}
                    style={{
                        width: '800px',
                        height: '650px',
                        backgroundColor: 'white',
                        top: '30%',
                        left: '30%',
                    }}
                >
                    <Icon
                        name="close"
                        color={tokens.colors.interactive.primary__resting.hex}
                        onClick={() => setIsOpen(false)}
                    />
                    <PCSLink
                        relatedObjects={relatedObjects}
                        setRelatedObjects={setRelatedObjects}
                    />
                </Scrim>
            )}
        </Fragment>
    );
};

{
    /* <Modal onClose={close}>
<H1>Portaled Menu Element</H1>
<Select
    isClearable
    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    menuPortalTarget={document.body}
    isSearchable
    name="color"
    menuPosition={isFixed ? 'fixed' : 'absolute'}
    menuPlacement={portalPlacement}
    options={['123', '12']}
    menuShouldScrollIntoView={false}
/>
<Note Tag="label">
    <select
        onChange={this.setPlacement}
        value={portalPlacement}
        id="cypress-portalled__radio-bottom"
    >
        <option value="auto">auto</option>
        <option value="bottom">bottom</option>
        <option value="top">top</option>
    </select>
</Note>
<Note Tag="label" style={{ marginLeft: '1em' }}>
    <input
        type="radio"
        onChange={this.toggleMode}
        value="fixed"
        checked={isFixed}
        id="cypress-portalled__fixed"
    />
    Fixed
</Note>
<Note Tag="label" style={{ marginLeft: '1em' }}>
    <input
        type="radio"
        onChange={this.toggleMode}
        value="portal"
        checked={!isFixed}
        id="cypress-portalled__portal"
    />
    Portal
</Note>
</Modal> */
}
