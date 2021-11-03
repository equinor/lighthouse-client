import { Button, Table } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { useRef, useState } from "react";
import Icon from "../../Icon/Icon";
import { useTableContext } from "../Context/TableProvider";
import { SetState } from "../Types/ReactWrappers";
import { ColumSelector } from "./ColumSelector";


const { Head, Row, Cell } = Table;

interface HeaderProps<T> {
    // data: T;
    activeCellKey: string;
    sortDirection: boolean;
    setActiveCellKey: SetState<string>;
    setSortDirection: SetState<boolean>;
}

export function Header<T>({ setSortDirection, sortDirection, activeCellKey, setActiveCellKey }: HeaderProps<T>) {
    const { headers, awaitableHeaders, setHeaderData } = useTableContext();
    const addButtonRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    return (

        <Head>
            <Row>
                {headers.map(({ title, key }, index) => (
                    <Cell width={500} style={{ backgroundColor: key === activeCellKey ? tokens.colors.ui.background__info.rgba : "" }} key={`Heading-${key}-${index}`} rowSpan={1} onClick={() => {
                        setActiveCellKey(key)
                        key === activeCellKey && setSortDirection(d => !d)
                    }
                    }>
                        {title}
                        {key === activeCellKey && <Icon
                            name={
                                sortDirection
                                    ? 'chevron_up'
                                    : 'chevron_down'
                            }
                        />}
                    </Cell>
                ))}

                <Button variant="ghost_icon" ref={addButtonRef} onClick={() => { setIsOpen(s => !s) }}>
                    <Icon name='add' />
                </Button>
                <ColumSelector
                    anchorEl={addButtonRef.current}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    awaitableHeaders={awaitableHeaders}
                    headerData={headers} />
            </Row>
        </Head>
    );
}