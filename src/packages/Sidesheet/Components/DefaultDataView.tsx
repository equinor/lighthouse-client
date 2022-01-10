import React from 'react';

import { DataEntry, DataGrid, Description, Section, Title, Wrapper } from './DataView.styles';
import { DefaultTableView } from './DefaultTableView';

export const DefaultDataView = (props: any): JSX.Element => {
    if (Array.isArray(props)) {
        return <DefaultTableView data={props} />;
    }

    /**
     * Make viewOptions
     */

    const title = Object.keys(props).find((x) => x.toLowerCase().includes('title'));
    const description = Object.keys(props).find((x) => x.toLowerCase().includes('description'));

    const viewOptions = true;

    return (
        <>
            {props && viewOptions && !!Object.keys(props).length && (
                <>
                    <Wrapper>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {title && (
                                <Section>
                                    <label>{title}</label>
                                    <Title>{props[title]}</Title>
                                </Section>
                            )}
                        </div>
                        {description && (
                            <Description>
                                <strong>{description}</strong>
                                <p>{props[description]}</p>
                            </Description>
                        )}

                        <Section>
                            <DataGrid>
                                {Object.keys(props).map((key) => {
                                    if (key === title || key === description) return null;
                                    if (Array.isArray(props[key])) return null;
                                    return (
                                        <DataEntry key={key}>
                                            <strong>{key}: </strong>
                                            <p>{props[key] || '-'} </p>
                                        </DataEntry>
                                    );
                                })}
                            </DataGrid>
                        </Section>

                        {Object.keys(props).map((key) => {
                            const data = props[key];

                            if (Array.isArray(data) && data.length > 0)
                                return (
                                    <Section>
                                        <>
                                            <strong>{key}: </strong>

                                            {typeof data[0] === 'object' ? (
                                                <DefaultTableView data={data} />
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
