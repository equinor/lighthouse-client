import { Button, Icon } from '@equinor/eds-core-react';
import { Table, useColumns } from '@equinor/Table';
import React from 'react';
import { ViewOptions } from '../../WorkSpaceApi/WorkSpaceTypes';
import { DataEntry, DataGrid, Description, Section, Title, Wrapper } from './DataView.styles';

interface DefaultDataViewProps {
    selectedData: any;
    onClose: () => void;
    viewOptions?: ViewOptions<unknown>;
    data: any[];
}
export const DefaultDataView = ({
    viewOptions,
    selectedData,
    onClose,
    data,
}: DefaultDataViewProps): JSX.Element => {
    const columns = useColumns(data[0]);
    return (
        <>
            {selectedData && viewOptions && !!Object.keys(selectedData).length && (
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
                                    onClose();
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
};
