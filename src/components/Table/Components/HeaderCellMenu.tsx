import { Menu, Typography } from "@equinor/eds-core-react";
import styled from "styled-components";
import { HeaderCellProps } from "./HeaderCell";


const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
interface HeaderCellMenuProps extends HeaderCellProps {
    anchorEl: HTMLDivElement | null;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    FilterComponent?: React.FC<{ filterId: string }>
}

export function HeaderCellMenu({ anchorEl, isOpen, setIsOpen, Header, canGroupBy, getGroupByToggleProps, getSortByToggleProps, canSort, id, FilterComponent }: HeaderCellMenuProps) {

    return (
        <Menu
            open={isOpen}
            anchorEl={anchorEl}
            id='header-menu'
            onClose={() => { setIsOpen(false) }}
            placement="bottom-end"
        >
            {
                canSort && <Menu.Item {...getSortByToggleProps()}>
                    <Typography group="navigation" variant="menu_title" as="span">
                        Toggle Sort
                    </Typography>
                </Menu.Item>
            }

            {
                canGroupBy && <Menu.Item {...getGroupByToggleProps()}>
                    <Typography group="navigation" variant="menu_title" as="span">
                        Group by {Header}
                    </Typography>
                </Menu.Item>
            }
            {
                FilterComponent ? <Menu.Section title="Filter">
                    <FilterComponent filterId={id} />
                </Menu.Section> : <></>
            }

        </Menu >

    )
}