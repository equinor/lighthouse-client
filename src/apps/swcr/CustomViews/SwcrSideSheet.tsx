import { Chip } from '@equinor/eds-core-react';
import { SidesheetHeaderContent } from '@equinor/GardenUtils';
import { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { isProduction } from '../../../Core/Client/Functions';
import { SidesheetApi } from '../../../packages/Sidesheet/Components/ResizableSidesheet';
import useSignatures from '../hooks/useSignatures';
import { SwcrPackage } from '../models/SwcrPackage';

const SideSheetContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
    overflow: scroll;
    height: -webkit-fill-available;
`;

const TextBlock = styled.div`
    padding: 8px;
    margin-bottom: 16px;
    padding-right: 160;
    border-bottom: 1px solid black;
    max-width: 960px;

    pre {
        white-space: pre-wrap;
    }
`;

const TextBlockEmpty = styled.div`
    margin-bottom: 16px;
`;

const Signatures = styled.div`
    padding: 8px;
    margin-bottom: 16px;
    display: grid;
    grid-gap: 0 16px;
    grid-template-columns: 3fr 1fr 5fr;
`;

const TagsAndAttachmentBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
`;

const Tags = styled.div`
    display: flex;
    flex-grow: 1;
    div {
        margin: 4px;
    }
`;

const ChipText = styled.div`
    font-size: 16px;
    text-align: center;
`;

const Attachments = styled.div`
    display: flex;
    align-items: center;
    a {
        padding-left: 8px;
    }
`;

interface SwcrSideSheetProps {
    item: SwcrPackage;
    actions: SidesheetApi;
}

export function SwcrSideSheet({ item, actions }: SwcrSideSheetProps): JSX.Element {
    const { signatures, signaturesFetching } = useSignatures(item.swcrId);

    const procosysUrl = isProduction() ? item.url : item.url.replace('procosys', 'procosystest');
    const attachmentsUrls = item.url.replace('#', '#tab=attachments&');
    useEffect(() => {
        actions.setTitle(<SidesheetHeaderContent title={item.swcrNo} url={procosysUrl} />);
    }, [item.swcrNo, procosysUrl]);

    return (
        <div style={{ height: '100%' }}>
            <SideSheetContainer>
                <h3>{item.title}</h3>
                <TagsAndAttachmentBlock>
                    <Tags>
                        <Chip>
                            <ChipText>{item.contract || '-'}</ChipText>
                        </Chip>
                        <Chip>
                            <ChipText>{item.priority || '-'}</ChipText>
                        </Chip>
                        <Chip>
                            <ChipText>{item.referenceTypes || '-'}</ChipText>
                        </Chip>
                        <Chip>
                            <ChipText>{item.supplier || '-'}</ChipText>
                        </Chip>
                        <Chip>
                            <ChipText>{item.system || '-'}</ChipText>
                        </Chip>
                    </Tags>
                    {parseInt(item.cntAttachments) > 0 && (
                        <Attachments>
                            Attachments:
                            <a
                                target="_BLANK"
                                href={
                                    isProduction()
                                        ? attachmentsUrls
                                        : attachmentsUrls.replace('procosys', 'procosystest')
                                }
                                rel="noreferrer"
                            >
                                {item.cntAttachments}
                            </a>
                        </Attachments>
                    )}
                </TagsAndAttachmentBlock>
                <TextBlock>
                    <h5>Description</h5>
                    {item.description ? (
                        <pre>{item.description}</pre>
                    ) : (
                        <TextBlockEmpty>No description</TextBlockEmpty>
                    )}
                </TextBlock>
                <TextBlock>
                    <h5>Modifications</h5>
                    {item.modification ? (
                        <pre>{item.modification}</pre>
                    ) : (
                        <TextBlockEmpty>No modifications</TextBlockEmpty>
                    )}
                </TextBlock>
                <Signatures>
                    <h5>Next signatures</h5>
                    <h5>Seq</h5>
                    <h5>By</h5>

                    {!signaturesFetching &&
                        signatures &&
                        signatures
                            .filter((signature) => !signature.signDate)
                            .map((signature, key) => (
                                <Fragment key={'signature' + key}>
                                    <div>{signature.signatureRole}</div>
                                    <div>{signature.ranking}</div>
                                    <div>{signature.functionalRole || signature.person}</div>
                                </Fragment>
                            ))}
                </Signatures>
            </SideSheetContainer>
        </div>
    );
}
