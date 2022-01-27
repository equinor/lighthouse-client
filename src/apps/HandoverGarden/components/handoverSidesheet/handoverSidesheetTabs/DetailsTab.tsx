import { useMemo } from 'react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { HandoverPackage } from '../../../models/HandoverPackage';
import { HandoverDetails } from '../../../models/HandoverResources';

const StringCell = ({ value }: { value: string }) => <>{value.trim() ? value.trim() : 'N/A'}</>;

const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') return 'N/A';
    const dateParts = new Intl.DateTimeFormat(undefined).formatToParts(date);
    return `${dateParts[0].value}/${dateParts[2].value}/${dateParts[4].value}`;
};

const DateCell = ({ date }: { date: string }) => <>{formatDateString(date)}</>;

const TabContent = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    h3 {
        padding: 8px;
    }
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    margin-bottom: 32px;

    th {
        text-align: left;
    }

    td {
        border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
        padding: 8px;

        &:first-child {
            width: 240px;
            font-weight: bold;
        }
    }
`;

type DetailsTabProps = {
    commpkg: HandoverPackage;
    nextToSign: HandoverDetails[];
    dataIsFetching: boolean;
};

const DetailsTab = ({ commpkg, nextToSign, dataIsFetching }: DetailsTabProps): JSX.Element => {
    const NextToSign = useMemo(() => {
        if (dataIsFetching) return <>Loading...</>;

        return nextToSign.length ? <>{nextToSign[0].nextToSign}</> : '';
    }, [nextToSign, dataIsFetching]);

    return (
        <TabContent>
            <h3>Details</h3>
            <Table>
                <tbody>
                    <tr>
                        <td>Project</td>
                        <td>
                            <StringCell
                                value={`${commpkg.projectDescription} (${commpkg.projectIdentifier})`}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm Pkg Responsible</td>
                        <td>
                            <StringCell value={commpkg.responsible} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm Pkg Discipline</td>
                        <td>
                            <StringCell value={commpkg?.mcDisciplines?.join(',') || ''} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm Pkg Area</td>
                        <td>
                            <StringCell value={commpkg.area} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm Pkg Phase</td>
                        <td>
                            <StringCell value={commpkg.phase} />
                        </td>
                    </tr>
                    <tr>
                        <td>System</td>
                        <td>
                            <StringCell value={commpkg.system} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm Pkg Tags</td>
                        <td>
                            <StringCell value={commpkg.volume.toString()} />
                        </td>
                    </tr>
                    <tr>
                        <td>Remark</td>
                        <td>
                            <StringCell value={commpkg.remark} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Priority 1</td>
                        <td>
                            <StringCell value={`${commpkg.priority1} - ${commpkg.priority1}`} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Priority 2</td>
                        <td>
                            <StringCell value={`${commpkg.priority2} - ${commpkg.priority2}`} />
                        </td>
                    </tr>
                    <tr>
                        <td>Commissioning Priority 3</td>
                        <td>
                            <StringCell value={`${commpkg.priority3} - ${commpkg.priority3}`} />
                        </td>
                    </tr>
                    <tr>
                        <td>Comm Pkg Progress</td>
                        <td>
                            <StringCell value={`${commpkg.progress || 0}%`} />
                        </td>
                    </tr>

                    <tr>
                        <td>Next to sign</td>
                        <td>{NextToSign}</td>
                    </tr>
                </tbody>
            </Table>

            <h3>Milestones</h3>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Planned</th>
                        <th>Forecast</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>RFCC (C01)</td>
                        <td>
                            <DateCell date={commpkg.plannedStartDate} />
                        </td>
                        <td>
                            <DateCell date={commpkg.forecastStartDate} />
                        </td>
                    </tr>
                    <tr>
                        <td>TAC (C06)</td>
                        <td>
                            <DateCell date={commpkg.plannedTacDate} />
                        </td>
                        <td>
                            <DateCell date={commpkg.forecastTacDate} />
                        </td>
                    </tr>
                    <tr>
                        <td>RFOC (C07)</td>
                        <td>
                            <DateCell date={commpkg.plannedFinishDate} />
                        </td>
                        <td>
                            <DateCell date={commpkg.forecastFinishDate} />
                        </td>
                    </tr>
                    <tr>
                        <td>DCC (D01)</td>
                        <td>
                            <DateCell date={commpkg.demolitionPlannedStartDate} />
                        </td>
                        <td>
                            <DateCell date={commpkg.demolitionForecastStartDate} />
                        </td>
                    </tr>
                    <tr>
                        <td>RFRC (D03)</td>
                        <td>
                            <DateCell date={commpkg.demolitionPlannedFinishDate} />
                        </td>
                        <td>
                            <DateCell date={commpkg.demolitionForecastFinishDate} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </TabContent>
    );
};

export default DetailsTab;
