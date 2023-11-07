import { formatDateString, StringCell, Table } from '@equinor/GardenUtils';
import { useMemo } from 'react';
import { HandoverDetails, HandoverPackage } from '../../../../models';
import { TabContent } from './DetailsTabStyles';

type DetailsTabProps = {
    commpkg: HandoverPackage;
    nextToSign: HandoverDetails[] | undefined;
    dataIsFetching: boolean;
};

export const DetailsTab = ({
    commpkg,
    nextToSign,
    dataIsFetching,
}: DetailsTabProps): JSX.Element => {
    const NextToSign = useMemo(() => {
        if (dataIsFetching) return <>Loading...</>;

        return nextToSign?.length ? <>{nextToSign[0].nextToSign}</> : '';
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
                            <StringCell value={formatDateString(commpkg.plannedStartDate)} />
                        </td>
                        <td>
                            <StringCell value={formatDateString(commpkg.forecastStartDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>TAC (C06)</td>
                        <td>
                            <StringCell value={formatDateString(commpkg.plannedTacDate)} />
                        </td>
                        <td>
                            <StringCell value={formatDateString(commpkg.forecastTacDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>RFOC (C07)</td>
                        <td>
                            <StringCell value={formatDateString(commpkg.plannedFinishDate)} />
                        </td>
                        <td>
                            <StringCell value={formatDateString(commpkg.forecastFinishDate)} />
                        </td>
                    </tr>
                    <tr>
                        <td>DCC (D01)</td>
                        <td>
                            <StringCell
                                value={formatDateString(commpkg.demolitionPlannedStartDate)}
                            />
                        </td>
                        <td>
                            <StringCell
                                value={formatDateString(commpkg.demolitionForecastStartDate)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>RFRC (D03)</td>
                        <td>
                            <StringCell
                                value={formatDateString(commpkg.demolitionPlannedFinishDate)}
                            />
                        </td>
                        <td>
                            <StringCell
                                value={formatDateString(commpkg.demolitionForecastFinishDate)}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </TabContent>
    );
};
