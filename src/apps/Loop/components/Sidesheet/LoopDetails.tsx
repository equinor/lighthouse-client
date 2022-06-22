import { StringCell, Table } from '@equinor/GardenUtils';
import { Loop } from '../../types';

type LoopDetailsProps = {
    loop: Loop;
};
export const LoopDetails = ({ loop }: LoopDetailsProps) => {
    return (
        <div style={{ height: 'fit-content' }}>
            <h3>Details</h3>
            <Table>
                <tbody>
                    <tr>
                        <td>System</td>
                        <td>
                            <StringCell value={loop.functionalSystem} />
                        </td>
                    </tr>
                    <tr>
                        <td>Project</td>
                        <td>
                            <StringCell value={loop.project} />
                        </td>
                    </tr>
                    <tr>
                        <td>Area</td>
                        <td>
                            <StringCell value={loop.location} />
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>

                        <td>
                            <StringCell value={loop.status} />
                        </td>
                    </tr>
                    <tr>
                        <td>Contractor</td>

                        <td>
                            <StringCell value={loop.responsible} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
