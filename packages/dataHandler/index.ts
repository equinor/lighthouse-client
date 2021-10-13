interface CommPk {
    plantId: string;
    facility: string;
    project: string;
    commPkgNo: string;
    id: number;
    description: string;
    handoverCommStatus: Status;
    handoverOperationStatus: Status;
    rfccPlanned?: Date;
    rfocPlanned?: Date;
    mcStatus: MCStatus;
    commStatus: MCStatus;
    area: string;
    phase: string;
    priority1: string;
    priority2: string;
    priority3: string;
    responsible: string;
}

interface ApiComPk {
    CommPriority3__Id?: string,
    Description: string,
    PlannedStartup: string
    Status__Id: string,
    CommPriority1__Id?: string,
    Id: number,
    CommPkgNo: string,
    CommPhase__Id: string,
    CommPriority2__Id?: null,
    Area__Id: string,
    Responsible__Id: string ,
    OperationHandoverStatus: number,
    CommissioningHandoverStatus: number,
    PlannedCompleted:string,
    McStatus__Id: string
}

type MCStatus = 'OS' | 'PA' | 'PB' | 'OK';
type Status =
    | 'Approved'
    | 'Outstanding'
    | 'PartlyApproved'
    | 'Rejected'
    | 'Sent';


    // Todo fix  plantId: "data", facility: "string" and project: "string",
export function decodeCommPk(commPkData: ApiComPk): CommPk {
    return {
        plantId: "data",
        facility: "string",
        project: "string",
        commPkgNo: commPkData.CommPkgNo,
        id: commPkData.Id,
        description: commPkData.Description,
        handoverCommStatus: decodeStatusFormInt(commPkData.CommissioningHandoverStatus),
        handoverOperationStatus: decodeStatusFormInt(commPkData.OperationHandoverStatus),
        rfccPlanned?: new Date(commPkData.PlannedStartup),
        rfocPlanned?:  new Date(commPkData.PlannedCompleted),
        mcStatus: commPkData.McStatus__Id as MCStatus,
        commStatus: commPkData.Status__Id as MCStatus,
        area: commPkData.Area__Id,
        phase: commPkData.CommPhase__Id,
        priority1:  commPkData.CommPriority1__Id,
        priority2:  commPkData.CommPriority2__Id,
        priority3:  commPkData.CommPriority3__Id,
        responsible:  commPkData.Responsible__Id,
    }
}

function decodeStatusFormInt(val: number){
        switch (val) {
            case 4:
                return "Approved"
            case 3:
                return "PartlyApproved"
            case 2:
                return "Rejected"
            case 1:
                return "Sent"
            default:
                return "Outstanding";
}

// 2:26
// apiDecoder : String -> Project -> D.Decoder CommPk
// apiDecoder plantId project =
//     D.succeed CommPk
//         |> hardcoded plantId
//         |> hardcoded project.facility
//         |> hardcoded project.name
//         |> required "CommPkgNo" D.string
//         |> required "Id" D.int
//         |> required "Description" D.string
//         |> required "CommissioningHandoverStatus" statusDecoder
//         |> required "OperationHandoverStatus" statusDecoder
//         |> required "PlannedStartup" maybeDate
//         |> required "PlannedCompleted" maybeDate
//         |> required "McStatus__Id" mcStatusDecoder
//         |> required "Status__Id" mcStatusDecoder
//         |> required "Area__Id" nullString
//         |> required "CommPhase__Id" nullString
//         |> required "CommPriority1__Id" nullString
//         |> required "CommPriority2__Id" nullString
//         |> required "CommPriority3__Id" nullString
//         |> required "Responsible__Id" nullString
// 2:27
// https://procosys.equinor.com/JOHAN_CASTBERG/Search/Load?searchId=96128
// procosys.equinor.comprocosys.equinor.com
// Project completion tool, used to keep track of status of each tagged item in an investment project, including technical information for the tags.
// 2:27

// 2:28
// statusFromInt : Int -> Status
// statusFromInt val =
//     case val of
//         4 ->
//             Approved

//         3 ->
//             PartlyApproved

//         2 ->
//             Rejected

//         1 ->
//             Sent

//         _ ->
//             Outstanding
// 2:29
// type Status
//     = Approved
//     | Outstanding
//     | PartlyApproved
//     | Rejected
//     | Sent
// 2:30
// type CombinedStatus
//     = NoHandover
//     | RFCCSent
//     | RFCCPartly
//     | RFCC
//     | RFOCSent
//     | RFOCPartly
//     | RFOC
//     | RFCCRejected
//     | RFOCRejected
//     | Error

// combinedHandoverStatus : CommPk -> CombinedStatus
// combinedHandoverStatus commPk =
//     case ( commPk.handoverCommStatus, commPk.handoverOperationStatus ) of
//         ( Outstanding, Outstanding ) ->
//             NoHandover

//         ( Sent, Outstanding ) ->
//             RFCCSent

//         ( PartlyApproved, Outstanding ) ->
//             RFCCPartly

//         ( Approved, Outstanding ) ->
//             RFCC

//         ( Approved, Sent ) ->
//             RFOCSent

//         ( Approved, PartlyApproved ) ->
//             RFOCPartly

//         ( Approved, Approved ) ->
//             RFOC

//         ( Rejected, _ ) ->
//             RFCCRejected

//         ( _, Rejected ) ->
//             RFOCRejected

//         _ ->
//             Errore
