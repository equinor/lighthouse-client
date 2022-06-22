import { Button, Icon, Checkbox, Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState, useRef } from 'react';
import styled from 'styled-components';

interface ShowHideFilterButtonProps {
    allFilters: string[];
    visibleFilters: string[];
    setVisibleFilters: (val: string[]) => void;
}

export const ToggleHideFilterPopover = ({
    setVisibleFilters,
    visibleFilters,
    allFilters,
}: ShowHideFilterButtonProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleChange = (val: string) => {
        if (visibleFilters.includes(val)) {
            setVisibleFilters(visibleFilters.filter((s) => s !== val));
        } else {
            setVisibleFilters([...visibleFilters, val]);
        }
    };

    return (
        <>
            <div ref={ref}>
                <Button variant="ghost_icon" onClick={() => setIsOpen(true)}>
                    <Icon
                        name="playlist_add"
                        color={tokens.colors.interactive.primary__resting.hex}
                    />
                </Button>
            </div>

            {isOpen && (
                <Popover
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    anchorEl={ref.current}
                    placement="bottom-end"
                >
                    <Popover.Title>Filter types</Popover.Title>
                    <Popover.Content
                        style={{ maxHeight: '60vh', overflowY: 'scroll', overflowX: 'hidden' }}
                    >
                        <PopoverList>
                            {allFilters.map((s) => (
                                <ItemWrapper key={s}>
                                    <Checkbox
                                        checked={visibleFilters.includes(s)}
                                        onChange={() => handleChange(s)}
                                    />
                                    <div>{s}</div>
                                </ItemWrapper>
                            ))}
                        </PopoverList>
                    </Popover.Content>
                </Popover>
            )}
        </>
    );
};

const PopoverList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
`;

const ItemWrapper = styled.div`
    display: flex;
    gap: 0.2em;
    align-items: center;
    width: 100%;
`;
