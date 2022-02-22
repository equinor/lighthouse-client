import { Button, Chip } from '@equinor/eds-core-react';
import { Fragment } from 'react';
import styled from 'styled-components';
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export function SwcrSideSheet(item: SwcrPackage): JSX.Element {
    const { signatures, signaturesFetching } = useSignatures(item.swcrId);

    return (
        <div style={{ height: '100%' }}>
            <SideSheetContainer>
                <Header>
                    <h3>{item.swcrNo}</h3>
                    {/* <a target="_BLANK" href={item.url} rel="noreferrer">
                        <Button key="linkToProcosys" variant="ghost">
                            Open in ProCoSys
                        </Button>
                    </a> */}
                </Header>
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
                                href={item.url.replace('#', '#tab=attachments&')}
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
