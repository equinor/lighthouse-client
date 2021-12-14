import { Button, Icon } from '@equinor/eds-core-react';
import { Table, useColumns } from '@equinor/Table';
import { useEffect, useState } from 'react';
import { useDataContext } from '../../Context/DataProvider';
import { DataEntry, DataGrid, Description, Section, Title, Wrapper } from './DataView.styles';

export function DataView(): JSX.Element {
    const { data, itemId, viewOptions } = useDataContext();
    const columns = useColumns(data[0]);
    const [selectedData, setSelectedData] = useState<any>(undefined);

    useEffect(() => {
        setSelectedData(
            data.find((item) => item[viewOptions?.objectIdentifierKey || ''] === itemId)
        );
    }, [data, itemId, viewOptions]);

    return (
        <>
            {selectedData && viewOptions && (
                <>
                    <Wrapper>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {viewOptions.title && (
                                <Section>
                                    <label>{viewOptions.title.label}</label>

                                    <Title>{selectedData[viewOptions.title.key]}</Title>
                                </Section>
                            )}

                            <Button
                                variant="ghost_icon"
                                onClick={() => {
                                    setSelectedData(undefined);
                                }}
                            >
                                <Icon name="close" />
                            </Button>
                        </div>

                        {viewOptions.description && (
                            <Description>
                                <strong>{viewOptions.description.label}</strong>

                                <p>{selectedData[viewOptions.description.key]}</p>
                            </Description>
                        )}

                        <Section>
                            <DataGrid>
                                {Object.keys(selectedData).map((key) => {
                                    if (
                                        key === viewOptions.title?.key ||
                                        key === viewOptions.description?.key
                                    )
                                        return null;

                                    if (Array.isArray(selectedData[key])) return null;

                                    return (
                                        <DataEntry key={key}>
                                            <strong>{key}: </strong>
                                            <p>{selectedData[key] || '-'} </p>
                                        </DataEntry>
                                    );
                                })}
                            </DataGrid>
                        </Section>

                        {Object.keys(selectedData).map((key) => {
                            const data = selectedData[key];

                            if (Array.isArray(data) && data.length > 0)
                                return (
                                    <Section>
                                        <>
                                            <strong>{key}: </strong>

                                            {typeof data[0] === 'object' ? (
                                                <Table options={{ data, columns }} />
                                            ) : (
                                                <div>
                                                    {data.map((item, index) => (
                                                        <p key={item + index}>{item}</p>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    </Section>
                                );
                        })}
                    </Wrapper>
                </>
            )}
        </>
    );
}
