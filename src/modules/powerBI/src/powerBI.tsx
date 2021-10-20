import { Embed, Report, service } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import 'powerbi-report-authoring';
import { useState } from "react";
import styled from "styled-components";
import { usePowerBI } from "./api";
import "./style.css";



const Wrapper = styled.div`
position: relative;
    width: 100%;
    height: calc(100vh - 110px);
`;


export const PowerBI = () => {
    const { config } = usePowerBI();
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

        </Wrapper>
    );
};
