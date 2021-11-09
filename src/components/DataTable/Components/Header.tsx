import { Button, Table } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { useRef, useState } from "react";
import Icon from "../../Icon/Icon";
import { useTableContext } from "../Context/TableProvider";
import { ColumSelector } from "./ColumSelector";


const { Head, Row, Cell } = Table;



export function Header() {
    const { headers, activeHeader, toggleSortDirection, sortDirection, setSelectedColum } = useTableContext();
    const addButtonRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    return (

        <Head>
            <Row>
                {headers.map(({ title, key }, index) => (
                    <Cell width={500} style={{ backgroundColor: key === activeHeader ? tokens.colors.ui.background__info.rgba : "" }} key={`Heading-${key}-${index}`} rowSpan={1} onClick={() => {
                        setSelectedColum(key)
                        key === activeHeader && toggleSortDirection(!sortDirection)
                    }
                    }>
                        {title}
                        {key === activeHeader && <Icon
                            name={
                                sortDirection
                                    ? 'chevron_up'
                                    : 'chevron_down'
                            }
                        />}
                    </Cell>
                ))}
                <td>
                    <Button variant="ghost_icon" ref={addButtonRef} onClick={() => { setIsOpen(s => !s) }}>
                        <Icon name='add' />
                    </Button>
                    <ColumSelector
                        anchorEl={addButtonRef.current}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </td>
            </Row>
        </Head>
    );
}