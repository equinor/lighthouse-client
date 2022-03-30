export enum PipetestStep {
    Unknown = 'Unknown',
    ReadyForBolttensioning = 'Bolt tensioning (B)',
    ReadyForPressureTest = 'Pressure test (T)',
    ReadyForPainting = 'Painting (X)',
    ReadyForHtTest = 'A-test (1)',
    ReadyForInsulation = 'Insulation (Z)',
    ReadyForHtRetest = 'B-test (2)',
    ReadyForMarking = 'Marking (M)',
    Complete = 'Complete',
}

export enum CheckListStepTag {
    Unknown = '#U',
    Bolttensioning = '#B',
    PressureTest = '#T',
    ChemicalCleaning = '#C',
    HotOilFlushing = '#H',
    Painting = '#X',
    HtTest = 'ELE19.1',
    Insulation = '#Z',
    HtRetest = 'ELE19.2',
    HtTemporary = 'ELE99',
    Marking = '#M',
    Complete = 'C',
}

export enum CheckListStatus {
    OK = 'OK',
    Outstanding = 'OS',
    PunchAError = 'PA',
    PunchBError = 'PB',
    Inactive = 'IN',
}

export enum PipetestCompletionStatus {
    Complete = 'Complete',
    Outstanding = 'Outstanding',
    PunchAError = 'PunchAError',
    PunchBError = 'PunchBError',
    Inactive = 'Inactive',
}

export enum PipetestCheckListOrder {
    Unknown = 0,
    Bolttensioning = 1,
    PressureTest = 2,
    Painting = 3,
    HtTest = 4,
    Insulation = 5,
    HtRetest = 6,
    Marking = 7,
    Complete = 8,
}

export enum PipetestStatusOrder {
    Unknown = 0,
    ReadyForBolttensioning = 1,
    ReadyForPressureTest = 2,
    ReadyForPainting = 3,
    ReadyForHtTest = 4,
    ReadyForInsulation = 5,
    ReadyForHtRetest = 6,
    ReadyForMarking = 7,
    Complete = 8,
}
