import { Embed, Report, service } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import 'powerbi-report-authoring';
import { useState } from "react";
import styled from "styled-components";
import { usePowerBI } from "./api";
import { Filter } from "./models/filter";
import "./style.css";
import { tokens } from "@equinor/eds-tokens";
import Icon from '../../../components/Icon/Icon';

const Wrapper = styled.div`
position: relative;
    width: 100%;
    height: calc(100vh - 110px);
`;

const ErrorWrapper = styled.div`
    margin-top: 100px;
    height: "-webkit-fill-available";
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`

const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
`;

const Info = styled.p`
    color: ${tokens.colors.interactive.warning__resting.rgba};
    font-weight: 500;
`;

interface PowerBiProps {
    reportUri: string;
    filterOptions?: Filter[];
}

export const PowerBI = ({ reportUri, filterOptions }: PowerBiProps) => {
    const { config, error } = usePowerBI(reportUri, filterOptions);
    const [report, setReport] = useState<Report>();

    const eventHandlersMap = new Map([
        ['loaded', function () {
            console.log('Report has loaded');
        }],
        ['rendered', function () {
            console.log('Report has rendered');

            // Update display message
            setMessage('The report is rendered')
        }],
        ['error', function (event?: service.ICustomEvent<any>) {
            if (event) {
                console.error(event.detail);
            }
        }]
    ]);

    const [displayMessage, setMessage] = useState(`The report is bootstrapped. Click the Embed Report button to set the access token`);
    return (
        <>
            {error ? (
                <ErrorWrapper>
                    <Icon name={"warning_outlined"} color={tokens.colors.interactive.warning__resting.rgba} size={48} />
                    <Heading>You do not have access to this report!</Heading>
                </ErrorWrapper>) :
                <Wrapper>
                    <PowerBIEmbed
                        embedConfig={config}
                        eventHandlers={eventHandlersMap}
                        getEmbeddedComponent={(embedObject: Embed) => {
                            console.log(`Embedded object of type "${embedObject.embedtype}" received`);
                            setReport(embedObject as Report);
                            window["report"] = embedObject

                        }}
                        cssClassName="pbiEmbed"
                    />
                </Wrapper>}
        </>

    );
};
