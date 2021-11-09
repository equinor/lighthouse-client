import { IdTokenEntity } from "@azure/msal-common";
import { Menu, Typography } from "@equinor/eds-core-react";
import { useMemo } from "react";
import styled from "styled-components";
import { FilterGroupeComponent } from "../../Filter";
import { useFilter } from "../../Filter/Hooks/useFilter";
import { HeaderCellProps } from "./HeaderCell";


const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
interface HeaderCellMenuProps extends HeaderCellProps {
    anchorEl: HTMLDivElement | null;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HeaderCellMenu({ anchorEl, isOpen, setIsOpen, Header, canGroupBy, getGroupByToggleProps, getSortByToggleProps, canSort, id }: HeaderCellMenuProps) {


    const { filterData, filterItemCheck } = useFilter();
    const filter = useMemo(() => filterData[id], [filterData, IdTokenEntity]);
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
                filter ? <Menu.Section title="Filter">
                    <FilterGroupeComponent filterGroup={filter} filterItemCheck={filterItemCheck} hideTitle={true} />
                </Menu.Section> : <></>
            }

        </Menu >

    )
}